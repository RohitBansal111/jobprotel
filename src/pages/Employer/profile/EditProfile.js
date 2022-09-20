import { Field, Form } from "react-final-form";
import Layout from "../../../components/Layout";
import UserAvtar from "./../../../assets/images/profile-img.jpg";
import ConnectIcon from "./../../../assets/icons/connect.png";
import badgeCrossIcon from "./../../../assets/icons/badge-closeicon.png";
import validate from "./validator/profileValidate";
import {
  renderField,
  RenderRadioButtonField,
  RenderFileUploadField,
  renderSelect,
} from "./../../../components/renderField";
import { RenderImageField } from "../../../components/file-input";
import { useState, useEffect } from "react";
import * as dropdownServices from "../../../services/dropDownServices";
import LocalizedStrings from "react-localization";
import titles from "../../../components/EmployerRegister/register.json";
import { RenderPhoneInput } from "../../../components/renderPhoneInput";
import * as employerDetails from "../../../services/employerServices";
import { async } from "@firebase/util";
import { useSelector } from "react-redux";
import toast from "toastr";
import { Loader } from "../../../components/Loader/Loader";

const EmployerEditProfile = () => {
  let titleStrings = new LocalizedStrings(titles);
  const authData = useSelector((state) => state.auth.user);
  const [countrylist, setCountrylist] = useState([]);
  const [phoneNumberFlag, setphoneNumberFlag] = useState();
  const [stateList, setStateList] = useState([]);
  const [employerData, setEmployerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companyLogo, setCompanyLogo] = useState("");

  const saveProfile = (values) => {
    console.log(values, "::::");
    let formData = new FormData();
    formData.append("userId", authData?.id);
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("companyPhone", values.companyPhone);
    formData.append("companyName", values.companyName);
  };

  const handleChangeCountry = async (e) => {
    const resp = await dropdownServices.stateList(e.target.value);
    setStateList(resp.data);
  };

  const getEmployerDetails = async (id) => {
    const resp = await employerDetails.getEmployerDetails(id);
    if (resp.status == 200) {
      setLoading(false);
      const response = resp.data.data;
      console.log(response, "::::");
      setEmployerData(response);
    } else if (resp.status == 400) {
      setLoading(false);
      // toast.error(
      //   resp?.data?.message ? resp.data.message : "Something went wrong"
      // );
    }
  };

  const handleLogoChange = (e) => {
    let file = e.target.files[0];
    setCompanyLogo(file);
  };

  useEffect(async () => {
    const countryList = await dropdownServices.countryList();
    setCountrylist(countryList.data);
  }, []);

  useEffect(() => {
    getEmployerDetails(authData?.id);
  }, [authData]);

  return (
    <Layout>
      <div className="inner-page-wrapper">
        <section className="topbg-banner">
          <div className="container">
            <div className="innerbg-banner">
              <div className="banner-edit"></div>
            </div>
          </div>
        </section>
        {loading ? (
          <Loader />
        ) : (
          <section className="job-feeds-wrapper">
            <div className="container">
              <div className="profile-feed-inner">
                <div className="user-profile-left">
                  <div className="user-profile-coll">
                    <div className="user-profile-detail">
                      <div
                        className="profile-pic-progress"
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <span className="profile-img">
                          <img src={companyLogo} alt="Company profile" />
                        </span>
                      </div>
                      <h3>{authData?.comapanyDetail?.companyName}</h3>
                      <div>
                        {authData?.comapanyDetail?.address}
                        {authData?.comapanyDetail?.cityName && ", "}
                        {authData?.comapanyDetail?.cityName}{" "}
                        <p>
                          {authData?.comapanyDetail?.stateResponse?.stateName}
                        </p>
                      </div>
                    </div>
                    <div className="profile-connect">
                      <div className="profile-con">
                        <img src={ConnectIcon} alt="Connect" />
                        <span className="conn-count">
                          {authData?.comapanyDetail?.availableConnects}
                        </span>
                      </div>
                      <h4>Available Connects</h4>
                    </div>
                    <div className="user-prof-info">
                      <ul className="prof-info-ul">
                        <li>
                          Contact Details{" "}
                          <span className="result">
                            {authData?.comapanyDetail?.companyEmail}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="jobs-feeds-sec">
                  <div className="jobs-com-profile">
                    {/* <div className="profile-update">
                    <p className="mailto:michael-taylor028@gmail.com">
                      michael-taylor028@gmail.com
                    </p>
                  </div> */}
                    <div className="profile-strength">
                      {/* <div className="profile-strength-inner">
                      <h3>
                        Profile strength:{" "}
                        <span className="profile-completed">60% Completed</span>
                      </h3>
                      <div className="profile-strength-bar">
                        <p
                          className="profile-progress"
                          style={{ width: "60%" }}
                        ></p>
                        <div className="profile-complete-bar">
                          <span
                            className="complete-bar completed"
                            style={{ left: "25%" }}
                          ></span>
                          <span
                            className="complete-bar completed"
                            style={{ left: "50%" }}
                          ></span>
                          <span
                            className="complete-bar"
                            style={{ left: "75%" }}
                          ></span>
                        </div>
                      </div>
                    </div> */}
                    </div>
                  </div>
                  <Form
                    onSubmit={saveProfile}
                    validate={validate}
                    initialValues={employerData}
                  >
                    {({ handleSubmit, submitting, values }) => (
                      <form onSubmit={handleSubmit}>
                        <section className="profile-information-view">
                          <div className="profile-information-coll">
                            <h3>Personal information</h3>
                            <div className="profile-edit-info-list">
                              <div className="form-field-group">
                                <div className="form-field flex50">
                                  <Field
                                    name="firstName"
                                    label="First Name"
                                    placeholder="Enter first name"
                                    component={renderField}
                                    disabled
                                  />
                                </div>
                                <div className="form-field flex50">
                                  <Field
                                    name="lastName"
                                    label="Last Name"
                                    placeholder="Enter last name"
                                    component={renderField}
                                    disabled
                                  />
                                </div>
                                <div className="form-field flex50">
                                  <Field
                                    name="email"
                                    placeholder="Enter email Address"
                                    label="Email Address"
                                    component={renderField}
                                    disabled
                                  />
                                </div>
                                <div>
                                  {/* <div className="form-field flex50">
                                  <Field
                                    name="countryId"
                                    label={titleStrings.countryTitle}
                                    component={renderSelect}
                                    onChange={handleChangeCountry}
                                  >
                                    <option value="" disabled>
                                      Select Country
                                    </option>
                                    {countrylist &&
                                      countrylist.map((country, i) => (
                                        <option value={country.id} key={i}>
                                          {country.countryName}
                                        </option>
                                      ))}
                                  </Field>
                                </div>
                                <div className="form-field flex50">
                                  <Field
                                    name="stateId"
                                    label={titleStrings.stateTitle}
                                    component={renderSelect}
                                  >
                                    <option value="" disabled>
                                      Select State
                                    </option>
                                    {stateList &&
                                      stateList.map((state, i) => (
                                        <option value={state.id} key={i}>
                                          {state.stateName}
                                        </option>
                                      ))}
                                  </Field>
                                </div>
                                <div className="form-field flex50">
                                  <Field
                                    name="city"
                                    label={titleStrings.cityTitle}
                                    component={renderField}
                                    placeholder="Enter City"
                                    type="text"
                                  ></Field>
                                </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section className="profile-information-view">
                          <div className="profile-information-coll">
                            <h3>Company Information</h3>
                            <div className="profile-edit-info-list">
                              <div className="form-field-group">
                                <div className="form-field flex50">
                                  <Field
                                    name="companyName"
                                    label="Company Name"
                                    component={renderField}
                                    placeholder="Enter company name"
                                    type="text"
                                  />
                                </div>
                                <div className="form-field flex50">
                                  <div className="field-render-main">
                                    <label>Company Phone Number</label>
                                    <Field
                                      name="companyPhone"
                                      placeholder="Enter Company Phone Number"
                                      value={phoneNumberFlag}
                                      onChange={setphoneNumberFlag}
                                      component={RenderPhoneInput}
                                    />
                                  </div>
                                </div>
                                <div className="form-field flex50">
                                  <Field
                                    name="companyAddress"
                                    placeholder="Enter Company Address"
                                    label="Company Address"
                                    component={renderField}
                                  />
                                </div>
                                <div className="form-field flex100">
                                  <div className="uploadImageSection mb-2">
                                    <div className="file-label-image">
                                      <label>Company Logo</label>
                                      <div className="file-upload">
                                        <input
                                          name="companyLogo"
                                          accept=".jpg, .jpeg, .png"
                                          type="file"
                                          onChange={handleLogoChange}
                                        />
                                      </div>
                                    </div>
                                    {/* <div className="aws-placeholder image4">
                                      <img
                                        src={companyLogo}
                                        className="img-aws"
                                        alt="avtar"
                                        width={100}
                                        height={100}
                                        layout="fill"
                                      />
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <div className="form-field flex100 mb-5 d-flex justify-content-end">
                          <button
                            type="button"
                            className="btn btn-save btn-primary"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    )}
                  </Form>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default EmployerEditProfile;
