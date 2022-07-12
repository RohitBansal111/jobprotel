import axios from "axios";

export const getStudentDetails = async (id) => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_PUBLIC_API_URL}/Account/StudentProfileDetails/userId?userId=${id}`
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