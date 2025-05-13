// src/network/core/apiCaller.js
import axiosInstance from './axiosInstance';

const callApi = async (endpointObj, data = {}, params = {}) => {
  const { url, method } = endpointObj;

  try {
    const response = await axiosInstance.request({
      url,
      method,
      ...(method === 'GET' ? { params } : { data })
    });

    return response;
  } catch (err) {
    throw err;
  }
};

export default callApi;
