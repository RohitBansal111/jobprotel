import axios from "axios";

export const postExtraCertificates = async (data) => {
  try {
    const resp = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API_URL}/ExtraCertificates/AddExtracertificate`,
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

export const getExtraCertificates = async (id) => {
  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_PUBLIC_API_URL}/ExtraCertificates/GetExtraCertificateByUser/studentID?studentID=${id}`
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

export const deleteExtraCertificates = async (id) => {
  try {
    const resp = await axios.delete(
      `${process.env.REACT_APP_PUBLIC_API_URL}/ExtraCertificates/studentID?certId=${id}`
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

export const updateExtraCertificatesTitle = async (id, data) => {
  try {
    const resp = await axios.put(
      `${process.env.REACT_APP_PUBLIC_API_URL}/ExtraCertificates/EditExtracertificate?certId=${id}`,
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
