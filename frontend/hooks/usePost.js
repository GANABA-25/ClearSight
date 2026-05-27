import { useState } from "react";

export const usePost = (postFn) => {
  const [isLoading, setIsLoading] = useState(false);
  const [postResponse, setPostResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const postData = async (uri, postData, config = {}) => {
    setIsLoading(true);
    try {
      const response = await postFn(uri, postData, config);
      setPostResponse(response);
    } catch (error) {
      setErrorMsg({
        ...errorMsg,
        message: error.response.data.message || "Failed to post data",
      });

      const timeOutId = setTimeout(() => {
        setErrorMsg({});
      }, 3000);

      return () => clearTimeout(timeOutId);
    } finally {
      setIsLoading(false);
    }
  };

  const clearPostResponse = () => setPostResponse(null);

  return {
    isLoading,
    setIsLoading,
    setPostResponse,
    postResponse,
    setErrorMsg,
    errorMsg,
    postData,
    clearPostResponse,
  };
};
