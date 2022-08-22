import axios from "axios";


export const postPaymentdetails = async (data) => {
    try {
      let token = localStorage.getItem("jobPortalUserToken")
      const res = await axios.post(
        `${process.env.REACT_APP_PUBLIC_API_URL}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status == 200) {
        return res;
      } else {
        throw new Error(res);
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
  