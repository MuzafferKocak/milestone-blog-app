import { fetchFail, fetchStart } from "../features/authSlice";
import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { getSuccess, getLikeSuccess, paginationSuccess } from "../features/blogSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useBlogCalls = () => {
  const dispatch = useDispatch();
  const { axiosPublic, axiosToken } = useAxios();

  const getPostData = async (path) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get(`/${path}/`);
      //   console.log("Fetched Data:", data.data);
      const datas = data.data;
      console.log(datas);
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
      console.error("Server Error:", error);
      toastErrorNotify("Blog post failed please try again 🤨");
      dispatch(fetchFail());
    }
  };
  const getDetailRead = async (path, id) => {
    dispatch(fetchStart());
    try {
      const urlPath = path === "blogs" ? "blogsDetail" : path;

      const { data } = await axiosToken.get(`/${path}/${id}/`);
      //   console.log("Fetched Data:", data.data);
      dispatch(getSuccess({ data: data.data, path: urlPath }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  const getCreateComment = async (path, id, comment) => {
    console.log("Function called with parameters:", { path, id, comment });
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.get(`/${path}/${id}/`, comment);

      dispatch(getSuccess({ data: data.data, path: comment }));

      toastSuccessNotify("Your comment has been sent successfully 👌");
    } catch (error) {
      toastErrorNotify("An error occurred while submitting your comment. 🤨");
      dispatch(fetchFail());
    }
  };

  // const getLikeCreate = async (path, id, likes) => {
  //   dispatch(fetchStart());
  //   try {
  //     const { data } = await axiosToken.post(`/${path}/${id}/postLike`  );

  //     dispatch(getSuccess({ data: data.data, path: likes }));
  //   } catch (error) {
  //     toastErrorNotify("Operations failed, check your internet connection");
  //     dispatch(fetchFail());
  //   }
  // };

  const getLikeCreate = async (id) => {
    console.log(id);
    try {
      const { data } = await axiosToken.post(`/blogs/${id}/postLike`, {});
      dispatch(getLikeSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (path, id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`/${path}/${id}/`);
      console.log(path, id);
      getPostData("blogs");
      toastSuccessNotify("Blog successfully deleted 👌");
    } catch (error) {
      toastErrorNotify("An error occurred while deleting the blog 🤨");
      dispatch(fetchFail());
    }
  };

  const getBlogsPage = async (page, limit) => {
    console.log(page)
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken(`/blogs?page=${page}&limit=${limit}`);
      dispatch(paginationSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`Failed to load`);
    }
  }

  

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
