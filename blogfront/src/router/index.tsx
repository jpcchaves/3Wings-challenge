import { Route, Routes } from "react-router-dom";
import BlogPostsList from "../modules/blogPosts/pages/blogPostsList";

const Router = () => {
  return (
    <Routes>
      <Route path="/*">
        <Route path="blog-posts/*" element={<BlogPostsList />}></Route>
        <Route path="*" element={<>404 error page</>} />
      </Route>
    </Routes>
  );
};

export default Router;
