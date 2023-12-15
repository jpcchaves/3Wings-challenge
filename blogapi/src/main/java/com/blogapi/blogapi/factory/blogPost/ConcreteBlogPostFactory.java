package com.blogapi.blogapi.factory.blogPost;

import com.blogapi.blogapi.data.dto.blogPost.BlogPostCreateRequestDto;
import com.blogapi.blogapi.domain.entities.BlogPost;
import org.springframework.stereotype.Component;

@Component
public class ConcreteBlogPostFactory implements BlogPostFactory {
    @Override
    public BlogPost createBlogPost(BlogPostCreateRequestDto requestDto) {
        BlogPost blogPost = new BlogPost();

        blogPost.setTitle(requestDto.getTitle());
        blogPost.setContent(requestDto.getContent());

        return blogPost;
    }
}
