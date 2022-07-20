import axios from "axios";

export const postProjectHistoryData = async (data) => {
  try {
    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/ProjectHistory/AddProjectHistory`,
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

export const getProjectHistoryData = async (id) => {
  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_PUBLIC_API_URL}/ProjectHistory/GetProjectHistory/userID?userID=${id}`
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
