import axiosRaw from "axios";
import { CognitoAuth } from "../models/cognito";

export const axios = axiosRaw.create({
  crossDomain: true,
  baseURL: 'https://9b9q2d8jt1.execute-api.us-east-2.amazonaws.com/dev'
});

axios.interceptors.request.use(async config => {
  if (CognitoAuth.acessToken) {
    if (CognitoAuth.hasTokenExpired) {
      await CognitoAuth.refreshToken();
    }
    config.headers = { Authorization:  CognitoAuth.acessToken };
  }

  return config;
});

axios.interceptors.response.use(
  response => response,
  error => {
    console.log(error)
    const defaultErrorMessage = "Something went wrong";
    const { data = defaultErrorMessage } = error.response || {};
    throw {
      ...error.response,
      message:
        typeof data === "object"
          ? data.error?.raw?.message || defaultErrorMessage
          : data
    };
  }
);

export const execute = async (method, endpoint, data) => method(endpoint, data);

export const get = async (endpoint, params = {}) =>
  execute(axios.get, endpoint, { params });

export const put = async (endpoint, params) =>
  execute(axios.put, endpoint, params);

export const patch = async (endpoint, data) =>
  execute(axios.patch, endpoint, data);

export const post = async (endpoint, data) =>
  execute(axios.post, endpoint, data);

export const del = async (endpoint, params = {}) =>
  execute(axios.delete, endpoint, params);
