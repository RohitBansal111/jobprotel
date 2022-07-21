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
import * as dropdownServices from "../../services/dropDownServices";
import toast from "toastr";
import { useNavigate } from "react-router";

const EmploymentDetailsModal = () => {
  const authData = useSelector((state) => state.auth.user);
  const [designationlist, setDesignationlist] = useState([]);

  const [id, setId] = useState("");
  const handleJobPost = async (values) => {

    const {
      employerName,
      designationId,
      isCurrentEmployer,
      salary,
      endDate,
      startDate,
    } = values;

    let data = {
      userId: id,
      designationId,
      employerName,
      isCurrentEmployer,
      startDate,
      endDate,
      salary,
    };
    if (
      data.userId &&
      data.designationId &&
      data.employerName &&
      data.isCurrentEmployer &&
      data.startDate &&
      data.endDate &&
      data.salary
    ) {
      const resp = await studentServices.sendStudentEmploymentData(data);
      console.log(resp);
      if (resp.status === 200) {
     document.getElementById("employmentModal").click(); 
        toast.success(
          resp.data.message ? resp.data.message : "Something went wrong"
        );
      }
    }
  };

  useEffect(async () => {
    if (authData) {
      setId(authData.id);
    }
  }, [authData]);
  useEffect(async () => {
    const designationList = await dropdownServices.designationList();
    setDesignationlist(designationList.data);
  }, []);

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
              <Form onSubmit={handleJobPost} validate={validate}>
                {({ handleSubmit, submitting, values }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="form-field-group mt-0">
                      <div className="form-field flex100">
                        <Field
                          name="designationId"
                          label="Designation"
                          component={renderSelect}
                          placeholder="Enter category"
                        >
                          {designationlist &&
                            designationlist.map((designation) => (
                              <option
                                value={designation.id}
                                key={designation.id}
                              >
                                {designation.title}
                              </option>
                            ))}
                        </Field>
                      </div>
                      <div className="form-field flex100">
                        <Field
                          name="employerName"
                          label="Organisation"
                          placeholder="Enter organisation "
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex100">
                        <label>Current Employer</label>
                        <div className="radio-button-groupss">
                          <Field
                            name="isCurrentEmployer"
                            value="true"
                            component={RenderRadioButtonField}
                            type="radio"
                            currentIndex="0"
                          >
                            Yes
                          </Field>
                          <Field
                            name="isCurrentEmployer"
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

                      <div className="form-field flex100 d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary button-submit"
                          // onClick={() => handleJobPost(values)}
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
