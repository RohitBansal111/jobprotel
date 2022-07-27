import axios from "axios";

export const jobPost = async (data) => {
  try {
    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Job`,
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

export const getJobList = async (data) => {
  try {
    let token = localStorage.getItem("jobPortalUserToken")
    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Job/GetJobByEmployer`,
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

export const getJobDetails = async (id) => {
  try {
    let token = localStorage.getItem("jobPortalUserToken")

    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Job/GetJob/jobId?jobId=${id}`,
      {},
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

export const getJobListByStudent = async (data) => {
  try {
    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Job/GetJobByStudent`,
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

export const getStudentListSuggestions = async (data) => {
  try {
    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Job/StudentListNotSendInvite?jobId=${data.jobId}`,
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

export const sendStudentJobInvitations = async (jobId, userId) => {
  const data = { jobId, userIds: [userId] };
  try {
    let token = localStorage.getItem("jobPortalUserToken")

    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Job/SendInvitations`,
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

export const applyJob = async (data) => {
  try {
    let token = localStorage.getItem("jobPortalUserToken")

    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Job/appliedjobs`,
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
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message,
      status: 400,
    };
  }
};

export const saveJob = async (data) => {
  try {
    let token = localStorage.getItem("jobPortalUserToken")

    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Job/AddFavroateJob`,
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
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message,
      status: 400,
    };
  }
};

export const getArchiveJobByEmployer = async (data) => {
  try {
    let token = localStorage.getItem("jobPortalUserToken");
    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Job/GetArchiveJobByEmployer`,
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

export const getActiveJobByEmployer = async (data) => {
  try {
    let token = localStorage.getItem("jobPortalUserToken");

    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Job/GetJobByEmployer`,
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
export const getReviewJobsByJobId = async (data) => {
  try {
    let token = localStorage.getItem("jobPortalUserToken");

    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Job/GetAppliedJobsByJobId`,
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
