import axios from "axios";
import { API_URL } from "../config";

export const registerUser = async (data) => {
  try {
    const resp = await axios.post(
      `${API_URL}/Account/Student-SignUp`,
      data
    );
    console.log(resp);
    if (resp.status == 201) {
      return resp;
    } else {
      throw new Error(resp.message);
    }
  } catch (err) {
    console.log(err);
    return {
      data: "",
      resp: err.message,
      status: 400,
    };
  }
};

export const loginUser = async (data) => {
  try {
    const resp = await axios.post(
      `${API_URL}/Account/login`,
      data
    );
    console.log(resp);
    if (resp.status == 201) {
      return resp;
    } else {
      throw new Error(resp.message);
    }
  } catch (err) {
    console.log(err);
    return {
      data: "",
      resp: err.message,
      status: 400,
    };
  }
};
