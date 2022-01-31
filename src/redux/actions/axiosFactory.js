import axios from "axios";
import { API_URL } from "./../../config"; 
import { loadState, saveState } from "./../store/localStorage";
import { get } from "lodash"; 


export const getInstance = () => {
  const instance = axios.create({
    baseURL: API_URL
  });
  instance.interceptors.response.use(
    function (response) {
      // Do something with response data
      return response;
    },
    function (error) {
      if (get(error, 'response.data.message') === "jwt expired" || get(error, 'response.status') === 401) {
        saveState({});
      }
      return Promise.reject(error);
    }
  );

  instance.interceptors.request.use(
    function (config) {
      delete config.headers.Authorization;
      delete config.headers.authorization;
      config.headers.Authorization = "Bearer " + get(loadState(), "auth.token");
      return config;
    },
    function (error) {
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return instance;
};
