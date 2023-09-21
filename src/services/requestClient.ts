import { SignatureV4 } from "@smithy/signature-v4";
import axios, { InternalAxiosRequestConfig } from "axios";
import { Sha256 } from "@aws-crypto/sha256-js";

const axiosClient = axios.create();

export const sigv4 = new SignatureV4({
  service: "sagemaker",
  region: process.env.REACT_APP_AWS_REGION || "",
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || "",
    sessionToken: process.env.REACT_APP_AWS_SESSION_TOKEN,
  },
  sha256: Sha256,
});

export const apiUrl = new URL(process.env.REACT_APP_MODEL_BASE_URL || "");

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
