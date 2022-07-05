import axios from "axios";

export const countryList = async () => {
  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Country/CountryList`
    );
    if (resp.status == 200) {
      return resp;
    } else {
      throw new Error(resp.message);
    }
  } catch (err) {
    return {
      data: "",
      resp: err.message,
      status: 400,
    };
  }
};

export const stateList = async (data) => {
  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_PUBLIC_API_URL}/State/StateList?CountryId=${data}`
    );
    if (resp.status == 200) {
      return resp;
    } else {
      throw new Error(resp.message);
    }
  } catch (err) {
    return {
      data: "",
      resp: err.message,
      status: 400,
    };
  }
};

export const qualificationList = async () => {
  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Qualification`
    );
    if (resp.status == 200) {
      return resp;
    } else {
      throw new Error(resp.message);
    }
  } catch (err) {
    return {
      data: "",
      resp: err.message,
      status: 400,
    };
  }
};
