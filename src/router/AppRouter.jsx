import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import About from "../pages/About";
import Dashboard from "../pages/Dashboard";
import NewBlog from "../pages/NewBlog";
// import Test from "../pages/Test";
import BlogDetail from "../pages/BlogDetail";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Dashboard />} />
      {/* <Route path="*" element={<NotFound />} /> */}
      <Route path="/" element={<PrivateRouter />}>
        {/* <Route path="profile" element={<Profile />} /> */}
        <Route path="/newblog" element={<NewBlog />} />
        <Route path={`/blogdetail/:id`} element={<BlogDetail />} />
        {/* <Route path="drafts" element={<Drafts />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRouter;
