import { searchArxiv } from "@/app/user/(sidebar)/search/actions/searchArxiv";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PaperData } from "./articleSlice";
import { FormState } from "@/app/user/(sidebar)/search/component/Form";

export interface PaperState {
  papers: PaperData[];
  loading: boolean;
  error: string | null;
}

const initialState: PaperState = {
  papers: [],
  loading: false,
  error: null,
};

export const searchPapers = createAsyncThunk(
  "papers/search",
  async ({ formState }: { formState: FormState }, thunkAPI) => {
    const res = await searchArxiv(formState);
    if (!res) return thunkAPI.rejectWithValue("不明なエラーが発生しました");
    if (res.err) return thunkAPI.rejectWithValue(res.msg);
    return res.data as PaperData[];
  }
);

export const paperSlice = createSlice({
  name: "papers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchPapers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPapers.fulfilled, (state, action) => {
        state.papers = action.payload;
        state.loading = false;
      })
      .addCase(searchPapers.rejected, (state, action) => {
        state.error = action.error.message || "データの取得に失敗しました";
      });
  },
});

export default paperSlice.reducer;
