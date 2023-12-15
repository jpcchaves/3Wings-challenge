import { blogPostEndpoint } from "../../../constants/env";
import { BlogPostMinDto } from "../../../domain/models/blogPosts/BlogPostMinDto";
import { ApiPaginatedResponse } from "../../../domain/models/common/ApiPaginatedResponse";
import useLoading from "../../../hooks/loading/useLoading";
import { useAppDispatch } from "../../../hooks/useRedux";
import { loadBlogPostsPaginated } from "../../../store/blogPosts";
import { HttpMethod, httpRequest } from "../../../utils/http";

const useBlogPosts = () => {
  const { isLoading, setLoading } = useLoading();
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
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { getBlogPostList, isLoading };
};

export default useBlogPosts;
