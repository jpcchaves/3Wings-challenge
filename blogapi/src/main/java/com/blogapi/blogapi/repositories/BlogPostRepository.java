package com.blogapi.blogapi.repositories;

import com.blogapi.blogapi.domain.entities.BlogPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {

    @Query("SELECT bp FROM BlogPost bp WHERE bp.isDeleted = false")
    Page<BlogPost> findAllBlogPosts(Pageable pageable);

    @Query("SELECT bp FROM BlogPost bp WHERE bp.id = :id AND bp.isDeleted = false")
    Optional<BlogPost> findBlogPostById(@Param("id") Long id);
}
