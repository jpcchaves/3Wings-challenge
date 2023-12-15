import { Navigate, Route, Routes } from "react-router-dom";
import BlogPostsList from "../modules/blogPosts/pages/blogPostsList";

const Router = () => {
  return (
    <Routes>
      <Route path="/*">
        <Route path="blog-posts" element={<BlogPostsList />} />
        <Route path="*" element={<Navigate to={"/blog-posts"} />} />
      </Route>
    </Routes>
  );
};

export default Router;
