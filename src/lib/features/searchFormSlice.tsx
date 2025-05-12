import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormState } from "@/app/user/(sidebar)/search/component/Form";
import { getUser } from "@/app/user/(sidebar)/search/actions/getUserAction";

export interface formState {
  formState: FormState;
  loading: boolean;
  error: string | null;
}

const initialState: formState = {
  formState: {
    freeWord: "",
    author: "",
    abstruct: "",
    title: "",
    categories: [],
  },
  loading: false,
  error: null,
};

export const getUserCategory = createAsyncThunk(
  "papers/userCat",
  async (_, thunkAPI) => {
    const res = await getUser();
    if (!res) return thunkAPI.rejectWithValue("不明なエラーが発生しました");
    if (res.err) return thunkAPI.rejectWithValue(res.msg);
    return res.data.categories as string[];
  }
);

export const searchFormSlice = createSlice({
  name: "papers",
  initialState,
  reducers: {
    changeFreeWord: (state, action: PayloadAction<{ freeWord: string }>) => {
      state.formState.freeWord = action.payload.freeWord;
    },
    changeAuthor: (state, action: PayloadAction<{ author: string }>) => {
      state.formState.author = action.payload.author;
    },
    changeTitle: (state, action: PayloadAction<{ title: string }>) => {
      state.formState.title = action.payload.title;
    },
    changeAbstruct: (state, action: PayloadAction<{ abstruct: string }>) => {
      state.formState.abstruct = action.payload.abstruct;
    },
    addCategory: (state, action: PayloadAction<{ newCategory: string }>) => {
      const newCategories = Array.from(
        new Set([...state.formState.categories, action.payload.newCategory])
      );
      state.formState.categories = newCategories;
    },
    removeCategory: (
      state,
      action: PayloadAction<{ removeCategory: string }>
    ) => {
      const list = state.formState.categories;
      state.formState.categories = list.filter(
        (t) => t !== action.payload.removeCategory
      );
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getUserCategory.pending, (state) => {
        state.error = null;
      })
      .addCase(getUserCategory.fulfilled, (state, action) => {
        state.formState.categories = action.payload;
      })
      .addCase(getUserCategory.rejected, (state, action) => {
        state.error = action.error.message || "データの取得に失敗しました";
      });
  },
});

export default searchFormSlice.reducer;

const {
  changeFreeWord,
  changeAuthor,
  changeTitle,
  changeAbstruct,
  addCategory,
  removeCategory,
} = searchFormSlice.actions;
export {
  changeFreeWord,
  changeAuthor,
  changeTitle,
  changeAbstruct,
  addCategory,
  removeCategory,
};
