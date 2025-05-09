import axiosInstance from "./../network/core/axiosInstance";

export const checkCompanyName = async (name) => {
  const response = await axiosInstance.post("/check-name", { name });
  return response.data;
};
