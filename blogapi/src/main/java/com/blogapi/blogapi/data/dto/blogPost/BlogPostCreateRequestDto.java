package com.blogapi.blogapi.data.dto.blogPost;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class BlogPostCreateRequestDto {
    @NotNull(message = "Blog post title is required")
    @NotBlank(message = "Blog post title is required")
    private String title;
    @NotNull(message = "Blog post content is required")
    @NotBlank(message = "Blog post content is required")
    private String content;

    public BlogPostCreateRequestDto() {
    }

    public BlogPostCreateRequestDto(
            String title,
            String content) {
        this.title = title;
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
