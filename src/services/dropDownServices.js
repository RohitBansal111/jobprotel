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

export const collegeList = async () => {
  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_PUBLIC_API_URL}/College`
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

export const genderList = async () => {
  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Gender`
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

export const skillsList = async () => {
  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_PUBLIC_API_URL}/Skill`
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