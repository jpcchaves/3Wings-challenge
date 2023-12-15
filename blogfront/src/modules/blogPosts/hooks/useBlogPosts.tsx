import { blogPostEndpoint } from "../../../constants/env";
import { BlogPostMinDto } from "../../../domain/models/blogPosts/BlogPostMinDto";
import { ApiPaginatedResponse } from "../../../domain/models/common/ApiPaginatedResponse";
import { HttpMethod, httpRequest } from "../../../utils/http";

const useBlogPosts = () => {
  const getBlogPostList = async () => {
    await httpRequest<void, ApiPaginatedResponse<BlogPostMinDto>>(
      HttpMethod.GET,
      blogPostEndpoint
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("");
      });
  };

  return { getBlogPostList };
};

export default useBlogPosts;
