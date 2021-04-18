import { useState, useCallback } from "react";
import axios from "axios";


export const useRequest = () => {
  const [res, setRes] = useState();
 

  const sendRequestForInsert = async (url, userData) => {
    
      const response = await axios.post(url, {
        ...userData,
      });
      setRes(response);
      return response;
    
  };

  const sendRequestForFetch = useCallback(async (url) => {
   
      const response = await axios.get(url);

      setRes(response);
      return response;
    
  }, []);
  const sendRequestForUpdate = async (url, userData) => {
    
      const response = await axios.patch(url, {
        ...userData,
      });
      setRes(response);
      return response;
  
  };
  const sendRequestForDelete = async (url) => {
    
      const response = await axios.delete(url);
      setRes(response);
      return response;
    
  };
  return {
    sendRequestForInsert,
    sendRequestForFetch,
    sendRequestForUpdate,
    sendRequestForDelete,
    res,
  };
};
