package com.blogapi.blogapi.services.impl;

import com.blogapi.blogapi.data.dto.blogPost.BlogPostCreateRequestDto;
import com.blogapi.blogapi.data.dto.blogPost.BlogPostDto;
import com.blogapi.blogapi.data.dto.blogPost.BlogPostMinDto;
import com.blogapi.blogapi.data.dto.common.ApiMessageResponse;
import com.blogapi.blogapi.data.dto.common.ApiPaginatedResponse;
import com.blogapi.blogapi.domain.entities.BlogPost;
import com.blogapi.blogapi.exception.BadRequestException;
import com.blogapi.blogapi.exception.ResourceNotFoundException;
import com.blogapi.blogapi.factory.blogPost.BlogPostFactory;
import com.blogapi.blogapi.repositories.BlogPostRepository;
import com.blogapi.blogapi.services.usecases.BlogPostService;
import com.blogapi.blogapi.utils.common.PaginationUtils;
import com.blogapi.blogapi.utils.mapper.MapperUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class BlogPostServiceImpl implements BlogPostService {
    private final MapperUtils mapperUtils;
    private final BlogPostRepository blogPostRepository;
    private final BlogPostFactory blogPostFactory;
    private final PaginationUtils paginationUtils;

    public BlogPostServiceImpl(
            MapperUtils mapperUtils,
            BlogPostRepository blogPostRepository,
            BlogPostFactory blogPostFactory,
            PaginationUtils paginationUtils) {
        this.mapperUtils = mapperUtils;
        this.blogPostRepository = blogPostRepository;
        this.blogPostFactory = blogPostFactory;
        this.paginationUtils = paginationUtils;
    }

    @Override
    public ApiMessageResponse createBlogPost(BlogPostCreateRequestDto requestDto) {
        verifyTitleAvaiability(requestDto.getTitle());

        BlogPost blogPost = blogPostFactory.createBlogPost(requestDto);
        blogPostRepository.save(blogPost);
        return new ApiMessageResponse("Post created successfully!");
    }

    @Override
    public ApiMessageResponse updateBlogPost(
            BlogPostCreateRequestDto requestDto,
            Long id) {
        verifyTitleAvaiability(requestDto.getTitle());
        BlogPost blogPost = fetchBlogPostById(id);
        blogPost.setTitle(requestDto.getTitle());
        blogPost.setContent(requestDto.getContent());
        blogPostRepository.save(blogPost);
        return new ApiMessageResponse("Blog post updated successfully!");
    }


    @Override
    public ApiPaginatedResponse<BlogPostMinDto> getBlogPostList(Pageable pageable) {
        Page<BlogPost> blogPostPage = blogPostRepository.findAllBlogPosts(pageable);
        List<BlogPostMinDto> blogPostMinDtos = mapperUtils.parseListObjects(blogPostPage.getContent(), BlogPostMinDto.class);
        return paginationUtils.buildApiResponsePaginated(blogPostPage, blogPostMinDtos);
    }

    @Override
    public BlogPostDto getBlogPostById(Long id) {
        BlogPost blogPost = fetchBlogPostById(id);
        return mapperUtils.parseObject(blogPost, BlogPostDto.class);
    }

    @Override
    public ApiMessageResponse deleteBlogPost(Long id) {
        BlogPost blogPost = fetchBlogPostById(id);

        blogPost.setDeleted(true);
        blogPost.setDeletedAt(new Date());
        blogPostRepository.save(blogPost);

        return new ApiMessageResponse("Blog post deleted successfully!");
    }

    private BlogPost fetchBlogPostById(Long id) {
        return blogPostRepository
                .findBlogPostById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with the given id!"));
    }

    private void verifyTitleAvaiability(String title) {
        if(existsByTitle(title)) {
            throw new BadRequestException("A post with the given title already exists");
        }
    }

    private Boolean existsByTitle (String title) {
        return blogPostRepository.existsByTitle(title);
    }
}
