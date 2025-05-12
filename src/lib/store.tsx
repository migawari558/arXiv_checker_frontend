import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./features/articleSlice";
import papersReducer from "./features/papersSlice";
import searchFormReducer from "./features/searchFormSlice";

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    papers: papersReducer,
    searchForm: searchFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
