import { fetchFail, fetchStart } from "../features/authSlice";
import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import {
  getSuccess,
  getLikeSuccess,
  paginationSuccess,
  setShowComments,
} from "../features/blogSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useBlogCalls = () => {
  const dispatch = useDispatch();
  const { axiosPublic, axiosToken } = useAxios();

  const getPostData = async (path) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get(`https://my-blog-api-alpha.vercel.app/${path}/`);
      console.log("Fetched Data:", data.data);
      const datas = data.data;
      // console.log(datas);
      dispatch(getSuccess({ data: datas, path }));
    } catch (error) {
      toastErrorNotify("Relevant data cannot be accessed");
      dispatch(fetchFail());
    }
  };

  const getCategories = async (path) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get(`/${path}/`);

      dispatch(getSuccess({ data: data.data, path }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  const getNewBlogCreate = async (path, newBlogInfo) => {
    dispatch(fetchStart());
    try {
      await axiosToken.post(`/${path}/`, newBlogInfo);

      toastSuccessNotify("Blog Posted Successfully 👌");
    } catch (error) {
      toastErrorNotify("Blog post failed please try again 🤨");
      dispatch(fetchFail());
    }
  };
  const getDetailRead = async (path, id) => {
    dispatch(fetchStart());
    try {
      const urlPath = path === "blogs" ? "blogsDetail" : path;

      const { data } = await axiosToken.get(`/${path}/${id}/`);
      // console.log("Fetched Data:", data.data);
      dispatch(getSuccess({ data: data.data, path: urlPath }));
      dispatch(setShowComments(data.data.comments));
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  const getCreateComment = async (commentContent, blogId, userId) => {
    // console.log("Sending Comment Data:", { blogId, userId, commentContent });
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.post(`/comments`, {
        userId,
        blogId,
        comment: commentContent,
      });
      // console.log(data);
      // console.log("Comment Function Parameters:", { blogId, userId, commentContent });
      dispatch(setShowComments(data));
      // console.log(data);
      toastSuccessNotify("Your comment has been sent successfully 👌");
    } catch (error) {
      console.log(error);
      toastErrorNotify("An error occurred while submitting your comment. 🤨");
      dispatch(fetchFail());
    }
  };

  const getLikeCreate = async (id, username) => {
    // console.log(id);
    try {
      const { data } = await axiosToken.post(`/blogs/${id}/like`, { username });
      // console.log("Backend response:", data);

      dispatch(getLikeSuccess(data));
      // console.log("State after dispatch:", data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (path, id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`/${path}/${id}/`);
      // console.log(path, id);
      getPostData("blogs");
      toastSuccessNotify("Blog successfully deleted 👌");
    } catch (error) {
      
      if(error.response){
        const errorMessage = error.response.data
        toastErrorNotify(errorMessage)
      }else{

        toastErrorNotify("An error occurred while deleting the blog 🤨");
      }
      dispatch(fetchFail());
    }
  };

  const getBlogsPage = async (page, limit) => {
    // console.log(page);
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken(`/blogs?page=${page}&limit=${limit}`);
      dispatch(paginationSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`Failed to load`);
    }
  };

  return {
    getPostData,
    getLikeCreate,
    getCategories,
    getNewBlogCreate,
    getDetailRead,
    getCreateComment,
    getBlogsPage,
    deleteBlog,
  };
};

export default useBlogCalls;
