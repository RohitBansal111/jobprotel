import axios from "axios";

export const viewUploadedFiles = async (path) => {
  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Admin/GetImageByKey?key=${path}`
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

export const getFiles = async (path) => {
  console.log(path, "::::");
  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_PUBLIC_API_URL_LIVE}Admin/GetFile?fileName=${path}`,
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

export const downloadFile = async (path) => {
  console.log(path, "::::");
  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_PUBLIC_API_URL_LIVE}Admin/DownloadFile?fileName=${path}`,
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