import axios from "axios";

export const postProjectHistoryData = async (data) => {
  try {
    let token = localStorage.getItem("jobPortalUserToken")

    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/ProjectHistory/AddProjectHistory`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
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

export const getProjectHistoryData = async (data) => {
  try {
    let token = localStorage.getItem("jobPortalUserToken")
    
    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/ProjectHistory/GetProjectHistory/userID`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
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

export const updateProjectHistoryData = async (id, data) => {
  try {
    let projectID = id;
    let token = localStorage.getItem("jobPortalUserToken")

    const resp = await axios.put(
      `${process.env.REACT_APP_PUBLIC_API_URL}/ProjectHistory/${id}?projectID=${projectID}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
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