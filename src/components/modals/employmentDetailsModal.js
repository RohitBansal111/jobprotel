import { Field, Form } from "react-final-form";
import {
  renderField,
  RenderRadioButtonField,
  renderSelect,
  renderNumberField,
} from "./../renderField";
import validate from "./validators/employerDetailsCValidator";
import ImageCropperModal from "../../components/Image-cropper";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as studentServices from "../../services/studentServices";

const EmploymentDetailsModal = () => {
  const authData = useSelector((state) => state.auth.user);

  const [id, setId] = useState("");
//   const [modal, setModal] = useState(false);
//   const [img, setImg] = useState({
//     personalInfoImg:
//       "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
//   });
//   const [profileImage, setProfileImage] = useState("");

  const handleJobPost = async (values) => {
    console.log(values);
    const {
      designation,
      organisation,
      currentEmployer,
      experienceInMonths,
      experienceInYears,
      noticePeriod,
      salary,
      startDate,
      endDate,
    } = values;
    let formData = new FormData();

    formData.append("userId", id);
    formData.append("employerName", organisation);
    formData.append("designation", designation);
    formData.append("isCurrentEmployer", currentEmployer);
    formData.append("totalExperienceInYear", experienceInYears);
    formData.append("totalExperienceInMonth", experienceInMonths ? experienceInMonths : "0");
    formData.append("noticePeriodInDays", noticePeriod);
    formData.append("salary", salary);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    //     formData.append("logoUrl", img.personalInfoImg);

    if (
      id &&
      designation &&
      organisation &&
      currentEmployer &&
      experienceInYears &&
      noticePeriod &&
      startDate &&
      endDate &&
      salary
    ) {
      const resp = await studentServices.sendStudentEmploymentData(formData);
      console.log(resp);
    }
  };

  useEffect(async () => {
    if (authData) {
      setId(authData.id);
    }
  }, [authData]);

  //   const handleImageChange = (event) => {
  //     setModal(true);
  //     if (event.target.files && event.target.files.length > 0) {
  //       setImg({ personalInfoImg: URL.createObjectURL(event.target.files[0]) });
  //     }
  //   };

  //   function readFile(file) {
  //     return new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.addEventListener("load", () => resolve(reader.result), false);
  //       reader.readAsDataURL(file);
  //     });
  //   }

  //   const closeModal = () => {
  //     setModal(false);
  //   };
  return (
    <div
      className="modal fade"
      id="employmentModal"
      tabIndex="-1"
      aria-labelledby="employmentModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="employmentModal">
              Add Employment Detail
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-4">
            <div className="kyc-detail-form">
              {/* <ImageCropperModal
                closeModal={closeModal}
                showImageCropModal={modal}
                readFile={readFile}
                imageSrc={img.personalInfoImg}
                setProfileImage={setProfileImage}
                setImg={setImg}
              /> */}
              <Form onSubmit={handleJobPost} validate={validate}>
                {({ handleSubmit, submitting, values }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="form-field-group mt-0">
                      {/* <div className="form-field flex100">
                        <div className="uploadImageSection mb-2">
                          <div className="file-label-image">
                            <label>Add company logo</label>
                            <div className="file-upload">
                              <input
                                name="logoUrl"
                                //   label={titleStrings.companyLogoTitle}
                                accept=".jpg, .jpeg, .png"
                                onChange={handleImageChange}
                                type="file"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-field flex100">
                        <div className="aws-placeholder image4">
                          <img
                            src={img.personalInfoImg}
                            className="img-aws"
                            alt="user"
                            width={100}
                            height={100}
                            layout="fill"
                          />
                        </div>
                      </div> */}
                      <div className="form-field flex100">
                        <Field
                          name="designation"
                          label="Designation"
                          placeholder="Enter Designation"
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex100">
                        <Field
                          name="organisation"
                          label="Organisation"
                          placeholder="Enter organisation "
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex100">
                        <label>Current Employer</label>
                        <div className="radio-button-groupss">
                          <Field
                            name="currentEmployer"
                            value="true"
                            component={RenderRadioButtonField}
                            type="radio"
                            currentIndex="0"
                          >
                            Yes
                          </Field>
                          <Field
                            name="currentEmployer"
                            value="false"
                            component={RenderRadioButtonField}
                            type="radio"
                            currentIndex="1"
                          >
                            No
                          </Field>
                        </div>
                      </div>
                      <div className="form-field flex100">
                        <Field
                          name="startDate"
                          label="Start Date"
                          placeholder="Enter start date"
                          component={renderField}
                          type="date"
                        />
                      </div>
                      <div className="form-field flex100">
                        <Field
                          name="endDate"
                          label="End Date"
                          placeholder="Enter end date"
                          component={renderField}
                          type="date"
                        />
                      </div>
                      <div className="form-field flex100 mb-2 withoutLabel">
                        <label htmlFor="">Experience</label>
                        <div className="inner-multi-field">
                          <Field
                            name="experienceInYears"
                            component={renderSelect}
                            placeholder="Year's"
                            type="text"
                          >
                            <option value="0">0 year</option>
                            {[...Array.from(Array(51).keys())]
                              .slice(1)
                              .map((num, i) => (
                                <option key={i} value={num}>
                                  {num ? num + " year's" : ""}
                                </option>
                              ))}
                          </Field>
                          <Field
                            name="experienceInMonths"
                            component={renderSelect}
                            placeholder="Month's"
                            type="text"
                          >
                            <option value="0">0 month</option>
                            {[...Array.from(Array(13).keys())]
                              .slice(1)
                              .map((num, i) => (
                                <option key={i} value={num}>
                                  {num ? num + " month's" : ""}
                                </option>
                              ))}
                          </Field>
                        </div>
                      </div>
                      <div className="form-field flex100">
                        <label>Expected Salary</label>
                        <Field
                          name="salary"
                          component={renderNumberField}
                          placeholder="Enter salary expectations"
                          type="text"
                          pattern="[0-9]*"
                        />
                      </div>
                      <div className="form-field flex100">
                        <label>Notice Period</label>
                        <Field
                          name="noticePeriod"
                          component={renderNumberField}
                          placeholder="Enter notice period in days"
                          type="text"
                          pattern="[0-9]*"
                        />
                      </div>
                      <div className="form-field flex100 d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary button-submit"
                          onClick={() => handleJobPost(values)}
                        >
                          Post Now
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

export default EmploymentDetailsModal;
