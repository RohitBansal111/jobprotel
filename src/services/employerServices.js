import axios from "axios";

export const getEmployerDetails = async (id) => {
  try {
    let token = localStorage.getItem("jobPortalUserToken");

    const resp = await axios.get(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Account/EmployeeProfileDetails?userId=${id}`,

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

export const updateEmployerDetails = async (data) => {
  try {
    let token = localStorage.getItem("jobPortalUserToken");
    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Account/CompanyProfileEditor`,
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
    };
  }
};
