import { blogPostEndpoint } from "../../../constants/env";
import { BlogPostCreateRequestDto } from "../../../domain/models/blogPosts/BlogPostCreateRequestDto";
import { BlogPostDto } from "../../../domain/models/blogPosts/BlogPostDto";
import { BlogPostMinDto } from "../../../domain/models/blogPosts/BlogPostMinDto";
import { ApiMessageResponse } from "../../../domain/models/common/ApiMessageResponse";
import { ApiPaginatedResponse } from "../../../domain/models/common/ApiPaginatedResponse";
import useLoading from "../../../hooks/loading/useLoading";
import useNotify from "../../../hooks/useNotify/useNotify";
import { useAppDispatch } from "../../../hooks/useRedux";
import { loadBlogPost, loadBlogPostsPaginated } from "../../../store/blogPosts";
import { HttpMethod, httpRequest } from "../../../utils/http";

const useBlogPosts = () => {
  const { isLoading, setLoading } = useLoading();
  const { notify } = useNotify();
  const dispatch = useAppDispatch();
  const getBlogPostList = async () => {
    setLoading(true);
    await httpRequest<void, ApiPaginatedResponse<BlogPostMinDto>>(
      HttpMethod.GET,
      blogPostEndpoint
    )
      .then((res) => {
        dispatch(loadBlogPostsPaginated(res));
      })
      .catch((err) => {
        notify(err, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getBlogPostById = async (id: string) => {
    setLoading(true);
    await httpRequest<void, BlogPostDto>(
      HttpMethod.GET,
      `${blogPostEndpoint}/${id}`
    )
      .then((res) => {
        dispatch(loadBlogPost(res));
      })
      .catch((err) => {
        notify(err, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createBlogPost = async (data: BlogPostCreateRequestDto) => {
    setLoading(true);
    await httpRequest<BlogPostCreateRequestDto, ApiMessageResponse>(
      HttpMethod.POST,
      blogPostEndpoint,
      data
    )
      .then(({ message }) => {
        notify(message, "success");
        getBlogPostList();
      })
      .catch((err) => {
        notify(err, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateBlogPost = async (data: BlogPostCreateRequestDto, id: string) => {
    setLoading(true);
    await httpRequest<BlogPostCreateRequestDto, ApiMessageResponse>(
      HttpMethod.PUT,
      `${blogPostEndpoint}/${id}`,
      data
    )
      .then(({ message }) => {
        notify(message, "success");
        getBlogPostList();
      })
      .catch((err) => {
        notify(err, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteBlogPost = async (id: string) => {
    setLoading(true);
    await httpRequest<void, ApiMessageResponse>(
      HttpMethod.DELETE,
      `${blogPostEndpoint}/${id}`
    )
      .then(({ message }) => {
        notify(message, "success");
        getBlogPostList();
      })
      .catch((err) => {
        notify(err, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    getBlogPostList,
    getBlogPostById,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    isLoading,
  };
};

export default useBlogPosts;
