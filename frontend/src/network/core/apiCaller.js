import axiosInstance from './axiosInstance';
const callApi = async (endpointObj, data = {}, params = {}) => {
  const { url, method } = endpointObj;
  const isFormData = data instanceof FormData;

  const config = {
    url,
    method,
    withCredentials: true,
    ...(method === 'GET' ? { params } : { data }),
    headers: isFormData ? {} : { 'Content-Type': 'application/json' }, // ✅ let Axios auto-handle multipart
  };

  try {
    const response = await axiosInstance.request(config);
    return response; // you can access `.data` outside
  } catch (err) {
    console.error('API error:', err?.response?.data || err.message);
    throw err;
  }
};
export default callApi;
