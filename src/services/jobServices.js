import axios from "axios";

export const jobPost = async (data) => {
  try {
    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Job`,
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

export const getJobList = async (data) => {
  try {
    const resp = await axios.post(`${process.env.REACT_APP_PUBLIC_API_URL}/Job/GetJobByEmployer`, data);
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
