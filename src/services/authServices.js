import axios from "axios";
// import { API_URL } from "../config";

export const registerUser = async (data) => {
  try {
    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Account/Student-SignUp`,
      data
    );
    if (resp.data.status == true) {
      return resp;
    } else {
      throw new Error(resp);
    }
  } catch (err) {
    return {
      data: "",
      error: err.response?.data?.error
        ? err.response.data.error
        : err.response.data.message
        ? err.response.data.message
        : err.message,
      errors:
        err.response && err.response.data && err.response.data.errors
          ? err.response.data.errors
          : err.message,
      status: 400,
    };
  }
};

export const registerEmployer = async (data) => {
  try {
    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Account/employer-signup`,
      data
    );
    if (resp.data.status == true) {
      return resp;
    } else {
      throw new Error(resp);
    }
  } catch (err) {
    return {
      data: "",
      error:
        err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : err.message,
      status: 400,
    };
  }
};

export const loginUser = async (data) => {
  try {
    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Account/login`,
      data
    );

    if (resp.status == 200) {
      return resp;
    } else {
      throw new Error(resp);
    }
  } catch (err) {
    return {
      data: "",
      error:
        err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : err.message,
      status: 400,
    };
  }
};

export const forgotPassword = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_PUBLIC_API_URL}/Account/forgot-password`,
    data
  );
};

export const resetPassword = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_PUBLIC_API_URL}/Account/reset-password`,
    data
  );
};
