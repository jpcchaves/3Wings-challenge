import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogPostDto } from "../../domain/models/blogPosts/BlogPostDto";
import { BlogPostMinDto } from "../../domain/models/blogPosts/BlogPostMinDto";
import { ApiPaginatedResponse } from "../../domain/models/common/ApiPaginatedResponse";

export interface BlogPostsState {
  blogPosts: BlogPostMinDto[] | null;
  blogPost: BlogPostDto | null;
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
type PayloadBlogPost = PayloadAction<BlogPostDto>;

const initialState: BlogPostsState = {
  blogPosts: null,
  blogPost: null,
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
      state.blogPost = null;
    },
    loadBlogPosts: (state, action: PayloadBlogPosts) => {
      state.blogPosts = action.payload;
    },
    loadBlogPost: (state, action: PayloadBlogPost) => {
      state.blogPost = action.payload;
    },
    clearBlogPost: (state) => {
      state.blogPost = null;
    },
  },
});

export const {
  loadBlogPostsPaginated,
  loadBlogPosts,
  loadBlogPost,
  clearBlogPost,
} = blogPostsSlice.actions;

export default blogPostsSlice.reducer;
