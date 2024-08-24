import axios, { AxiosError, type AxiosRequestConfig } from "axios";

export const useAxiosBackendService = () => {
  const createAxiosInstance = () => {
    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_BASE_API_URL,
    } as AxiosRequestConfig);

    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error instanceof AxiosError) {
          console.error(error);
        }
        return Promise.reject(error);
      }
    );

    return axiosInstance;
  };

  const axiosInstance = createAxiosInstance();

  return {
    axiosInstance,
  };
};
