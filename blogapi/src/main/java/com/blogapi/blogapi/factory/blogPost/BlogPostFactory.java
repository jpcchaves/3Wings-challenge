package com.blogapi.blogapi.factory.blogPost;

import com.blogapi.blogapi.data.dto.blogPost.BlogPostCreateRequestDto;
import com.blogapi.blogapi.domain.entities.BlogPost;

public interface BlogPostFactory {
    BlogPost createBlogPost(BlogPostCreateRequestDto requestDto);
}
