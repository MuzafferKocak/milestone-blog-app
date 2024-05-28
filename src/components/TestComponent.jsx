import React, { useEffect } from 'react';
import useAxios from '../hooks/useAxios'; 

const TestComponent = () => {
  const { axiosPublic, } = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Starting API call..."); 
        const response = await axiosPublic.get('/blogs/');
        console.log("Data fetched with axiosPublic:", response.data); 
      } catch (error) {
        console.error("Error fetching data with axiosPublic:", error);
      }
    };
    fetchData();
  }, [axiosPublic]);

  return <div>Check the console for output.</div>;
};

export default TestComponent;



const useBlogCalls = () => {
  const dispatch = useDispatch();

  const getCategories = async (path) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.get(`/${path}/`); // axiosPublic yerine axios kullanılmış
      console.log(data.data);
      dispatch(getSuccess({ data: data.data, path }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const getNewBlogCreate = async (endpoint, blogData) => {
    try {
      const response = await axios.post(`/api/${endpoint}/`, blogData);
      console.log("Blog created:", response.data);
      // Gerekirse yeni blog'u store'a eklemek için bir aksiyon dispatch edebilirsiniz
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const getPostData = async (endpoint) => {
    try {
      const response = await axios.get(`/api/${endpoint}/`);
      dispatch(getSuccess({ data: response.data, path: endpoint }));
    } catch (error) {
      console.error("Error fetching post data:", error);
      dispatch(fetchFail());
    }
  };

  return { getCategories, getNewBlogCreate, getPostData };
};

export default useBlogCalls;