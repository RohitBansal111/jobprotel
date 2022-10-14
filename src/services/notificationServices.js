import axios from "axios";

export const getNotifications = async (data) => {
  try {
    let token = localStorage.getItem("jobPortalUserToken");
    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Notification/ViewAllNotification`,
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

export const viewNotification = async (notificationId) => {
  try {
    let token = localStorage.getItem("jobPortalUserToken");
    const resp = await axios.put(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Notification/IsViewNotification/notificationId?notificationId=${notificationId}`,

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
