import axios from "axios";

export const updateAppliedJobs = async (data) => {
  try {
    let token = localStorage.getItem("jobPortalUserToken")
    const resp = await axios.put(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Job/UpdateAppliedJobsById`,
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
      errors:
        err.response && err.response.data && err.response.data.errors
          ? err.response.data.errors
          : err.message,
      status: 400,
    }
  }
};
