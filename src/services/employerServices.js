import axios from "axios";

export const getEmployerDetails = async (id) => {
  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Account/EmployeeProfileDetails?userId=${id}`
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

export const updateEmployerDetails = async (id,data) => {
  try {
    const resp = await axios.put(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Account/UpdateEmployeeProfile/userId?userId=${id}`,data
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
    };
  }
};
