import axios from "axios";

export const getStudentReviewApplicationData  = async () => {
    try {
      const resp = await axios.get(`${process.env.REACT_APP_PUBLIC_API_URL}/ResumeHistory`);
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