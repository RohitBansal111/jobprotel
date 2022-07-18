import { Field, Form } from "react-final-form";
import { renderField } from "./../renderField";
import validate from "./validators/postedJobValidator";
import ImageCropperModal from "../../components/Image-cropper";
import React, { useState, useEffect } from "react";

const EmploymentDetailsModal = () => {
  const [modal, setModal] = useState(false);
  const [img, setImg] = useState({
    personalInfoImg:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  });
  const [profileImage, setProfileImage] = useState("");

  const handleJobPost = async (values) => {
    console.log(values);
    const { designation, organisation, startDate, endDate } = values;
    let formData = new FormData();

    formData.append("designation", designation);
    formData.append("organisation", organisation);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("logoUrl", img.personalInfoImg);

    if (
      designation &&
      organisation &&
      startDate &&
      endDate &&
      img.personalInfoImg
    ) {
      // const resp = await something.something(formData)
      //  console.log(resp);
    }
  };

  const handleImageChange = (event) => {
    setModal(true);
    if (event.target.files && event.target.files.length > 0) {
      setImg({ personalInfoImg: URL.createObjectURL(event.target.files[0]) });
    }
  };

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const closeModal = () => {
    setModal(false);
  };
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
              <ImageCropperModal
                closeModal={closeModal}
                showImageCropModal={modal}
                readFile={readFile}
                imageSrc={img.personalInfoImg}
                setProfileImage={setProfileImage}
                setImg={setImg}
              />
              <Form onSubmit={handleJobPost} validate={validate}>
                {({ handleSubmit, submitting, values }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="form-field-group mt-0">
                      <div className="form-field flex100">
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
                      </div>
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
