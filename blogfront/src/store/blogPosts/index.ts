import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogPostMinDto } from "../../domain/models/blogPosts/BlogPostMinDto";
import { ApiPaginatedResponse } from "../../domain/models/common/ApiPaginatedResponse";

export interface BlogPostsState {
  blogPosts: BlogPostMinDto[] | null;
  pageNo: number;
  totalElements: number;
  totalPages: number;
  pageSize: number;
  last: boolean;
}

type PayloadBlogPostsPaginated = PayloadAction<
  ApiPaginatedResponse<BlogPostMinDto>
>;
type PayloadBlogPosts = PayloadAction<BlogPostMinDto[]>;

const initialState: BlogPostsState = {
  blogPosts: null,
  pageNo: 0,
  last: true,
  pageSize: 0,
  totalElements: 0,
  totalPages: 0,
};

export const blogPostsSlice = createSlice({
  name: "blogPosts",
  initialState,
  reducers: {
    loadBlogPostsPaginated: (
      state,
      {
        payload: { totalPages, totalElements, pageNo, pageSize, last, content },
      }: PayloadBlogPostsPaginated
    ) => {
      state.blogPosts = content;
      state.pageNo = pageNo;
      state.last = last;
      state.pageSize = pageSize;
      state.totalPages = totalPages;
      state.totalElements = totalElements;
    },
    loadBlogPosts: (state, action: PayloadBlogPosts) => {
      state.blogPosts = action.payload;
    },
  },
});

export const { loadBlogPostsPaginated, loadBlogPosts } = blogPostsSlice.actions;

export default blogPostsSlice.reducer;
