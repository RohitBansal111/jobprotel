import axios from "axios";

export const uploadPicture = async (Image) => {
  try {
    let token = localStorage.getItem("jobPortalUserToken");

    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Image/AddEditImage`,
      {Image:Image},
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
