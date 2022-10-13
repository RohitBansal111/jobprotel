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
import moment from "moment";

const EmploymentDetailsModal = ({ getEmploymentDetails }) => {
  const authData = useSelector((state) => state.auth.user);
  const [designationlist, setDesignationlist] = useState([]);
  const [errors, setErrors] = useState({});
  const [checkEnd, setScheCkEnd] = useState(false);

  const [id, setId] = useState("");

  const validation = (values) => {
    let isValid = true;
    let error = {};
    const { startDate, endDate } = values;
    const startDate1 = moment(startDate).format("MM/DD/YYYY");
    const startDOnly = startDate1 + " " + "00:00:00";
    const startDateOnly = moment(startDOnly).format("X");

    setErrors(error);
    return isValid;
  };

  const handleSubmit = async (values) => {
    // console.log(values, "::::");
    let {
      employerName,
      designationId,
      isCurrentEmployer,
      salary,
      startDate,
      endDate,
    } = values;

    if (validation(values)) {
      let data = {
        userId: id,
        designationId,
        employerName,
        isCurrentEmployer,
        startDate,
        salary,
      };
      if (data.isCurrentEmployer == "false") {
        data["endDate"] = endDate;
      }
      if (data.userId) {
        const resp = await studentServices.sendStudentEmploymentData(data);
        if (resp.status == 200) {
          window.location.reload();
          values.employerName = "";
          values.designationId = "";
          values.isCurrentEmployer = "";
          values.salary = "";
          values.startDate = "";

          if (authData) {
            getEmploymentDetails(authData);
          }

          document.getElementById("employmentModal").click();
          toast.success(
            resp.data.message ? resp.data.message : "Something went wrong"
          );
          employerName = "";
          designationId = "";
          isCurrentEmployer = "";
          salary = "";
          startDate = "";
        }
      }
    }
  };

  useEffect(() => {
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
              <Form onSubmit={handleSubmit} validate={validate}>
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
                          <option value="">Select Designation</option>
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
                        <div className="radio-button-groupss absolute-error">
                          <Field
                            name="isCurrentEmployer"
                            value="true"
                            component={RenderRadioButtonField}
                            type="radio"
                            currentIndex="0"
                            onChange={() => setScheCkEnd(true)}
                          >
                            Yes
                          </Field>
                          <Field
                            name="isCurrentEmployer"
                            value="false"
                            component={RenderRadioButtonField}
                            type="radio"
                            currentIndex="1"
                            onChange={() => setScheCkEnd(false)}
                          >
                            No
                          </Field>
                        </div>
                      </div>
                      {values.isCurrentEmployer && (
                        <div className="form-field flex100">
                          <Field
                            name="startDate"
                            label="Start Date"
                            placeholder="Enter start date"
                            component={renderField}
                            type="date"
                          />
                        </div>
                      )}
                      {values.isCurrentEmployer == "false" && !checkEnd && (
                        <div className="form-field flex100">
                          <Field
                            name="endDate"
                            label="End Date"
                            placeholder="Enter end date"
                            component={renderField}
                            type="date"
                            value={!checkEnd ? "2027-05-01" : ""}
                            min={values?.startDate}
                          />
                          <p style={{ color: "red" }}>{errors?.endDate}</p>
                        </div>
                      )}
                      <div className="form-field flex100 d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary button-submit"
                        >
                          Submit
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
