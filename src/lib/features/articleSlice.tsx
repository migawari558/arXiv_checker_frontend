import { getMyArticle } from "@/app/user/(sidebar)/articles/actions/getMyArticles";
import {
  changeIsOpen,
  saveNoteAction,
} from "@/app/user/(sidebar)/articles/actions/saveNoteAction";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Block } from "@blocknote/core";
import { Types } from "mongoose";
import { deleteArticleAction } from "@/app/user/(sidebar)/articles/actions/deleteArticle";

export type ArticleData = {
  _id: Types.ObjectId;
  arXivId: string;
  userId: Types.ObjectId;
  tags: string[];
  note: string;
  isOpen: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type PaperData = {
  authors: string[][];
  categories: { term: string; scheme: string }[];
  id: string;
  links: [
    { href: string; rel: string; type: string },
    { title: string; href: string; rel: string; type: string }
  ];
  published: string;
  summary: string;
  title: string;
  updated: string;
};

export interface ArticlesState {
  items: { article: ArticleData; paper: PaperData }[];
  loading: boolean;
  error: string | null;
}

const initialState: ArticlesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchArticles = createAsyncThunk(
  "articles/fetch",
  async (_, thunkAPI) => {
    const res = await getMyArticle();
    if (res.err) return thunkAPI.rejectWithValue(res.msg);
    return res.data as { article: ArticleData; paper: PaperData }[];
  }
);

export const toggleIsOpen = createAsyncThunk(
  "articles/toggleOpen",
  async ({ id, isOpen }: { id: string; isOpen: boolean }, thunkAPI) => {
    const res = await changeIsOpen(isOpen, id);
    if (res.err) return thunkAPI.rejectWithValue(res.msg);
    return { id, isOpen };
  }
);

export const updateNote = createAsyncThunk(
  "articles/updateNote",
  async ({ id, note }: { id: string; note: Block[] | undefined }, thunkAPI) => {
    const json = JSON.stringify(note);
    const res = await saveNoteAction(json, id);
    if (res.err) return thunkAPI.rejectWithValue(res.msg);
    return { id, note: json };
  }
);

export const deleteArticle = createAsyncThunk(
  "articles/deleteNote",
  async function ({ id }: { id: string }, thunkAPI) {
    const res = await deleteArticleAction(id);
    if (res.err) return thunkAPI.rejectWithValue(res.msg);
    return { id };
  }
);

export const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    addTagLocal: (
      state,
      action: PayloadAction<{ id: string; tag: string }>
    ) => {
      const target = state.items.find(
        (i) => i.article._id.toString() === action.payload.id
      );
      if (target) {
        target.article.tags.push(action.payload.tag);
      }
    },
    removeTagLocal: (
      state,
      action: PayloadAction<{ id: string; tag: string }>
    ) => {
      const target = state.items.find(
        (i) => i.article._id.toString() === action.payload.id
      );
      if (target) {
        const list = target?.article.tags;
        target.article.tags = list.filter((t) => t !== action.payload.tag);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.error = action.error.message || "データの取得に失敗しました";
      })
      .addCase(updateNote.pending, (state) => {
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const article = state.items.find(
          (item) => item.article._id.toString() === action.payload.id
        );
        if (article) {
          article.article.note = action.payload.note;
        }
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.error = action.error.message || "ノートの更新に失敗しました";
      })
      .addCase(toggleIsOpen.pending, (state) => {
        state.error = null;
      })
      .addCase(toggleIsOpen.fulfilled, (state, action) => {
        const article = state.items.find(
          (item) => item.article._id.toString() === action.payload.id
        );
        if (article) {
          article.article.isOpen = action.payload.isOpen;
        }
      })
      .addCase(toggleIsOpen.rejected, (state, action) => {
        state.error = action.error.message || "公開設定の更新に失敗しました";
      })
      .addCase(deleteArticle.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        // stateの記事を削除
        state.items = state.items.filter(
          (i) => i.article._id.toString() !== action.payload.id
        );
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.error = action.error.message || "削除に失敗しました";
      });
  },
});

export default articleSlice.reducer;

const { addTagLocal, removeTagLocal } = articleSlice.actions;

export { addTagLocal, removeTagLocal };
