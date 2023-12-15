import { useEffect } from "react";
import PageWrapper from "../../../../components/pageWrapper";
import useBlogPosts from "../../hooks/useBlogPosts";

const BlogPostsList = () => {
  const { getBlogPostList } = useBlogPosts();

  useEffect(() => {
    getBlogPostList();
  }, []);

  return (
    <PageWrapper pageTitle="Blog Posts">
      <>safsdaf</>
    </PageWrapper>
  );
};

export default BlogPostsList;
