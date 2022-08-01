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

export const updateStudentDetails = async (data) => {
  try {
    let token = localStorage.getItem("jobPortalUserToken");
    const resp = await axios.put(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Account/UpdateStudentProfile/userId`,
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

export const sendStudentKycData = async (data) => {
  try {
    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/StudentKyc/AddKycDocument`,
      data
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

export const sendStudentEmploymentData = async (data) => {
  try {
    let token = localStorage.getItem("jobPortalUserToken");

    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/EmploymentHistory/EmploymentHistory`,
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

export const getStudentEmploymentData = async (id) => {
  try {
    let token = localStorage.getItem("jobPortalUserToken");
    const resp = await axios.get(
      `${process.env.REACT_APP_PUBLIC_API_URL}/EmploymentHistory/GetEmployementHis/userId?userId=${id}`,
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

export const updateStudentEmploymentData = async (id, data) => {
  try {
    let token = localStorage.getItem("jobPortalUserToken");
    const resp = await axios.put(
      `${process.env.REACT_APP_PUBLIC_API_URL}/EmploymentHistory/UpdateEmployementHis/id?id=${id}`,
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

export const deleteStudentEmploymentData = async (id) => {
  try {
    const resp = await axios.delete(
      `${process.env.REACT_APP_PUBLIC_API_URL}/EmploymentHistory/DeleteEmployementHis/id?id=${id}`
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
