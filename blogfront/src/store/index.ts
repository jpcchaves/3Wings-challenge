import { configureStore } from "@reduxjs/toolkit";
import { blogPostsSlice } from "./blogPosts";

export const store = configureStore({
  reducer: {
    blogPosts: blogPostsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
