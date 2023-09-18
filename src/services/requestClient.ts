import axios, { InternalAxiosRequestConfig } from "axios";

const axiosClient = axios.create();

axiosClient.interceptors.request.use(async function (
  config: InternalAxiosRequestConfig
) {
  config.timeout = 2000;
  config.baseURL = process.env.REACT_APP_MODEL_BASE_URL;
  config.headers.set("Content-Type", "application/json");
  config.headers.set("Accept", "application/json");

  return config;
});

export default axiosClient;
