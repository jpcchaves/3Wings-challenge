import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/*">
        <Route path="blog-posts/*" element={<>blog api route</>}></Route>
        <Route path="*" element={<>404 error page</>} />
      </Route>
    </Routes>
  );
};

export default Router;
