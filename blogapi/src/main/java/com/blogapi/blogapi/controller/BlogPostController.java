package com.blogapi.blogapi.controller;

import com.blogapi.blogapi.data.dto.blogPost.BlogPostCreateRequestDto;
import com.blogapi.blogapi.data.dto.blogPost.BlogPostDto;
import com.blogapi.blogapi.data.dto.blogPost.BlogPostMinDto;
import com.blogapi.blogapi.data.dto.common.ApiMessageResponse;
import com.blogapi.blogapi.data.dto.common.ApiPaginatedResponse;
import com.blogapi.blogapi.services.usecases.BlogPostService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping("/api/v1/blog-posts")
public class BlogPostController {
    private final BlogPostService blogPostService;

    public BlogPostController(BlogPostService blogPostService) {
        this.blogPostService = blogPostService;
    }

    @PostMapping
    public ResponseEntity<ApiMessageResponse> createBlogPost(
            @RequestBody @Valid
            BlogPostCreateRequestDto requestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(blogPostService.createBlogPost(requestDto));
    }

    @GetMapping
    public ResponseEntity<ApiPaginatedResponse<BlogPostMinDto>> getBlogPostList(@PageableDefault Pageable pageable) {
        return ResponseEntity.ok(blogPostService.getBlogPostList(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogPostDto> getBlogPostById(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(blogPostService.getBlogPostById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiMessageResponse> updateBlogPost(
            @RequestBody @Valid BlogPostCreateRequestDto requestDto,
            @PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(blogPostService.updateBlogPost(requestDto, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiMessageResponse> deleteBlogPost(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(blogPostService.deleteBlogPost(id));
    }
}
