package com.blogapi.blogapi.utils.common;

import com.blogapi.blogapi.data.dto.common.ApiPaginatedResponse;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PaginationUtils {
    public <T, D> ApiPaginatedResponse<D> buildApiResponsePaginated(
            Page<T> page,
            List<D> content) {
        ApiPaginatedResponse<D> response = new ApiPaginatedResponse<>();
        response.setContent(content);
        response.setPageNo(page.getNumber());
        response.setPageSize(page.getSize());
        response.setTotalElements(page.getTotalElements());
        response.setTotalPages(page.getTotalPages());
        response.setLast(page.isLast());
        return response;
    }
}
