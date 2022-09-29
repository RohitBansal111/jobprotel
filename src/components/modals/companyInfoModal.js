import { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { RenderPhoneInput } from "../renderPhoneInput";
import { renderField, renderSelect } from "./../renderField";
import validate from "./validators/companyInfoValidator";
import * as dropdownData from "../../services/dropDownServices";
import * as employerServices from "../../services/employerServices";
import ImageCropperModal from "../Image-cropper";
import { useSelector, useDispatch } from "react-redux";
import toast from "toastr";
import * as types from "../../types/auth";
import { Loader } from "../Loader/Loader";
import app from "../../helpers/firebase";
import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  query,
  equalTo,
  orderByChild,
  get,
  update,
  remove,
} from "@firebase/database";
import DefaultProfile from "./../../assets/images/demo.png";

const CompanyInfoModal = ({ getEmployerDetails, employerData }) => {
  const db = getDatabase(app);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [modal, setModal] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [edit, setEdit] = useState(false);
  const [img, setImg] = useState({
    personalInfoImg: "",
  });
  toast.options = { preventDuplicates: true };

  const authData = useSelector((state) => state.auth.user);

  const handleCompanyInfo = async (values) => {
    let formData = new FormData();
    // let keys = Object.keys(values);

    // keys.forEach((key) => {
    //   formData.append(key, values[key]);
    // });
    formData.append("address", values.address);
    formData.append("companyPhone", values.companyPhone);
    formData.append("companyName", values.companyName);
    formData.append("userId", authData.id);

    if (edit) {
      formData.append("operationType", 2);
      if (profileImage) {
        formData.append("logoUrl", profileImage);
      } else {
        formData.append("logoUrl", null);
      }
    } else {
      formData.append("operationType", 1);
      formData.append("logoUrl", profileImage);
    }

    if (authData.id) {
      setLoading(true);
      const resp = await employerServices.updateEmployerDetails(formData);
      if (resp.status == 200) {
        setLoading(false);
        readUsers(authData.id, values.firstName, values.lastName);
        const resp2 = await employerServices.getEmployerDetails(authData.id);
        localStorage.setItem("jobPortalUser", JSON.stringify(resp2.data.data));

        if (resp2.status == 200) {
          dispatch({
            type: types.LOGIN_USER_SUCCESS,
            payload: resp2.data.data,
            token: localStorage.getItem("jobPortalUserToken"),
          });
        }

        toast.success(
          resp.data.message ? resp.data.message : "Something went wrong"
        );

        if (authData) {
          getEmployerDetails(authData.id);
        }
        document.getElementById("modelClose").click();
      } else if (resp.errors && typeof resp.errors === "object") {
        setLoading(false);
        let errors = "";
        let keys = Object.keys(resp.errors);
        keys.forEach((key) => {
          errors = key + "," + errors;
        });

        errors = errors.replace(/,\s*$/, "");
        toast.error(errors + "is Required");
      } else if (resp.error) {
        setLoading(false);
        toast.error(resp.error ? resp.error : "Something went wrong");
      } else {
        setLoading(false);
        document.getElementById("modelClose").click();
        if (resp.errors && typeof resp.errors === "object") {
          let errors = "";
          let keys = Object.keys(resp.errors);
          keys.forEach((key) => {
            errors = key + "," + errors;
          });

          errors = errors.replace(/,\s*$/, "");
          toast.error(errors + "is Required");
        } else if (resp.error) {
          setLoading(false);
          toast.error(resp.error ? resp.error : "Something went wrong");
        }
      }
    }
  };

  const readUsers = (userId, firstName, lastName) => {
    const starUserRef = ref(db, "User");
    onValue(starUserRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const convertedData = Object.keys(data).map((d) => {
          return data[d];
        });
        let finalData = convertedData.filter(
          (data) => data.employerId == userId
        );
        finalData.map((data) => {
          const updates = {};
          updates["/employerDisplayName/"] =
            firstName.charAt(0).toUpperCase() +
            firstName.slice(1) +
            " " +
            lastName;

          update(ref(db, "User/" + data.chatRoomID), updates);
        });
      }
    });
  };

  useEffect(() => {
    if (employerData) {
      if (employerData?.comapanyDetail?.logoPath) {
        setEdit(true);
      }
      // console.log(employerData, ":::::");
      if (
        employerData?.comapanyDetail !== undefined && employerData?.comapanyDetail !== null &&
        employerData?.comapanyDetail?.logoPath !== null
      ) {
        setImg({
          personalInfoImg: `${process.env.REACT_APP_IMAGE_API_URL}${employerData?.comapanyDetail?.logoPath}`,
        });
      }
      getCountryList();
      const data = {
        firstName: employerData?.firstName,
        lastName: employerData?.lastName,
        companyName: employerData?.comapanyDetail?.companyName,
        companyPhone: employerData?.comapanyDetail?.companyPhone,
        // countryId: employerData?.comapanyDetail?.countryResponse?.id,
        // stateId: employerData?.comapanyDetail?.stateResponse?.id,
        // cityName: employerData?.comapanyDetail?.cityName,
        // recruitingManagerName:
        //   employerData?.comapanyDetail?.recruitingManagerName,
        email: employerData?.email,
        address: employerData?.comapanyDetail?.address,
      };
      // if (
      //   employerData?.comapanyDetail !== null &&
      //   employerData?.comapanyDetail?.logoPath !== null
      // ) {
      //   setProfileImage(employerData?.comapanyDetail?.logoPath);
      // }
      // if (data.countryId) {
      //   getStateList(employerData?.comapanyDetail?.countryResponse?.id);
      // }
      setInitialData(data);
    }
  }, [employerData]);

  const getCountryList = async () => {
    const countryList = await dropdownData.countryList();
    setCountryList(countryList.data);
  };

  const handleChangeCountry = async (e) => {
    const resp = await dropdownData.stateList(e.target.value);
    setStateList(resp.data);
  };
  const getStateList = async (countryId) => {
    const resp = await dropdownData.stateList(countryId);
    setStateList(resp.data);
  };

  const handleImageChange = (event) => {
    setModal(true);
    if (event.target.files?.length > 0) {
      setImg({ personalInfoImg: URL.createObjectURL(event.target.files[0]) });
    }
  };

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const closeModal = () => {
    setModal(false);
  };
  return (
    <div
      className="modal fade"
      id="companyInfo"
      tabIndex="-1"
      aria-labelledby="companyInfo"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-large">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="companyInfo">
              Edit Company Info
            </h5>
            <button
              type="button"
              id="modelClose"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <ImageCropperModal
            closeModal={closeModal}
            showImageCropModal={modal}
            readFile={readFile}
            imageSrc={img.personalInfoImg}
            setProfileImage={setProfileImage}
            setImg={setImg}
          />
          <div className="modal-body p-4">
            <div className="kyc-detail-form">
              <Form
                initialValues={initialData}
                onSubmit={handleCompanyInfo}
                validate={validate}
                keepDirtyOnReinitialize
              >
                {({ handleSubmit, values }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="form-field-group mt-0">
                      <div className="form-field flex100">
                        <div className="uploadImageSection mb-2">
                          <div className="file-label-image">
                            <label>Upload Profile</label>
                            <div className="file-upload">
                              <input
                                name="logoUrl"
                                label="CompanyLogo"
                                accept=".jpg, .jpeg, .png"
                                onChange={handleImageChange}
                                type="file"
                              />
                            </div>
                          </div>
                          <div className="aws-placeholder image4">
                            <img
                              src={
                                img.personalInfoImg
                                  ? img.personalInfoImg
                                  : DefaultProfile
                              }
                              className="img-aws"
                              alt="user"
                              layout="fill"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="firstName"
                          label="First Name"
                          component={renderField}
                          placeholder="Enter first name"
                          type="text"
                        />
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="lastName"
                          label="Last Name"
                          component={renderField}
                          placeholder="Enter last name"
                          type="text"
                        />
                      </div>
                      <div className="form-field flex100">
                        <Field
                          name="companyName"
                          label="Company Name"
                          component={renderField}
                          placeholder="Enter company name"
                          type="text"
                        />
                      </div>

                      <div className="form-field flex50">
                        <Field
                          name="email"
                          label="Company Email Address"
                          component={renderField}
                          disabled={true}
                        />
                      </div>
                      <div className="form-field flex50">
                        <label>Company Phone Number</label>
                        <Field
                          name="companyPhone"
                          label="Company Phone Number"
                          component={RenderPhoneInput}
                          placeholder="Enter Company Phone Number"
                        />
                      </div>
                      <div className="form-field flex50">
                        {/* <Field
                          name="countryId"
                          label="Country"
                          component={renderSelect}
                          onChange={handleChangeCountry}
                        >
                          <option value="" disabled>
                            Select Country
                          </option>
                          {countryList &&
                            countryList.length > 0 &&
                            countryList.map((country) => (
                              <option value={country.id} key={country.id}>
                                {country.countryName}
                              </option>
                            ))}
                        </Field> */}
                      </div>
                      <div className="form-field flex50">
                        {/* <Field
                          name="stateId"
                          label="State"
                          component={renderSelect}
                        >
                          <option value="" disabled>
                            Select State
                          </option>
                          {stateList &&
                            stateList.length > 0 &&
                            stateList.map((state) => (
                              <option value={state.id} key={state.id}>
                                {state.stateName}
                              </option>
                            ))}
                        </Field> */}
                      </div>
                      <div className="form-field flex50">
                        {/* <Field
                          name="cityName"
                          label="City"
                          component={renderField}
                          placeholder="Enter City"
                          type="text"
                        ></Field> */}
                      </div>
                      <div className="form-field flex50">
                        {/* <Field
                          name="recruitingManagerName"
                          label="Recuriting Manager Name"
                          component={renderField}
                          placeholder="Enter recuriting manager name"
                          type="text"
                        /> */}
                      </div>
                      <div className="form-field flex100">
                        <Field
                          name="address"
                          label="Company Address"
                          component={renderField}
                          placeholder="Enter company address"
                          type="text"
                        />
                      </div>
                      <div className="form-field flex100 d-flex mt-3 justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary button-submit"
                        >
                          {loading && (
                            <div className="button-submit-loader">
                              <Loader />
                            </div>
                          )}{" "}
                          Update Info
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoModal;
