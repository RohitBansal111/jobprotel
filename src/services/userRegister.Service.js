import axios from "axios";
import { API_URL } from "../config";

export const registerUser = async (data) => {
  try {
    const resp = await axios.post(`${API_URL}/Account/Student-SignUp`, data);
    if (resp.data.status == true) {
      return resp;
    } else {
      throw new Error(resp.message);
    }
  } catch (err) {
    return {
      data: "",
      resp: err.message,
      status: 400,
    };
  }
};

export const loginUser = async (data) => {
  try {
    const resp = await axios.post(`${API_URL}/Account/login`, data);
    if (resp.status == 200) {
      return resp;
    } else {
      throw new Error(resp.message);
    }
  } catch (err) {
    return {
      data: "",
      resp: err.message,
      status: 400,
    };
  }
};
