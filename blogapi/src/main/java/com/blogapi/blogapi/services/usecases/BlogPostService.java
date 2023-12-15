package com.blogapi.blogapi.services.usecases;

import com.blogapi.blogapi.data.dto.blogPost.BlogPostCreateRequestDto;
import com.blogapi.blogapi.data.dto.blogPost.BlogPostDto;
import com.blogapi.blogapi.data.dto.blogPost.BlogPostMinDto;
import com.blogapi.blogapi.data.dto.common.ApiMessageResponse;
import com.blogapi.blogapi.data.dto.common.ApiPaginatedResponse;
import org.springframework.data.domain.Pageable;

public interface BlogPostService {
    ApiMessageResponse createBlogPost(BlogPostCreateRequestDto requestDto);

    ApiMessageResponse updateBlogPost(
            BlogPostCreateRequestDto requestDto,
            Long id);

    ApiPaginatedResponse<BlogPostMinDto> getBlogPostList(Pageable pageable);

    BlogPostDto getBlogPostById(Long id);

    ApiMessageResponse deleteBlogPost(Long id);
}
