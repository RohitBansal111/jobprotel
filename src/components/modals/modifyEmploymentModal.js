import { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import {
  renderField,
  RenderRadioButtonField,
  renderSelect,
  renderNumberField,
} from "./../renderField";
import validate from "./validators/employerDetailsCValidator";
import * as dropdownServices from "../../services/dropDownServices";
import * as studentServices from "../../services/studentServices";
import toast from "toastr";
import moment from "moment";

const ModifyEmploymentModal = ({ empData }) => {
  const [designationlist, setDesignationlist] = useState([]);
  const [id, setId] = useState("");
  const [userId, setUserId] = useState("");
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});

  const validation = (values) => {
    let isValid = true;
    let error = {};
    const { startDate, endDate } = values;
    const startDate1 = moment(startDate).format("MM/DD/YYYY");
    const startDOnly = startDate1 + " " + "00:00:00";
    const startDateOnly = moment(startDOnly).format("X");

    const endDate1 = moment(endDate).format("MM/DD/YYYY");
    const endDOnly = endDate1 + " " + "00:00:00";
    const endDateOnly = moment(endDOnly).format("X");

    if (endDOnly < startDOnly) {
      error.endDate = "End Date should be greater than start date";
      isValid = false;
    }

    setErrors(error);
    return isValid;
  };

  const handleJobPost = async (values) => {
    if (validation(values)) {
      let data = {
        designationId: values.designationId,
        employerName: values.employerName,
        endDate: values.endDate,
        isCurrentEmployer: values.isCurrentEmployer == "1" ? true : false,
        salary: values.salary,
        startDate: values.startDate,
        userId,
      };
      if (id && userId) {
        const resp = await studentServices.updateStudentEmploymentData(
          id,
          data
        );
        if (resp.status === 200) {
          document.getElementById("modifyEmploymentModal").click();
          toast.success(
            resp.data.message ? resp.data.message : "Something went wrong"
          );
        }
      }
    }
  };
  const getEmpData = (empData) => {
    const data = {
      designationId: empData.designationId,
      isCurrentEmployer: empData.isCurrentEmployer ? "1" : "2",
      employerName: empData.employerName,
      startDate: empData.startDate,
      endDate: empData.endDate,
      salary: empData.salary,
    };
    setData(data);
    setId(empData.id);
    setUserId(empData.userId);
  };

  useEffect(() => {
    getEmpData(empData);
  }, [empData]);

  const designationListData = async () => {
    const designationList = await dropdownServices.designationList();
    setDesignationlist(designationList.data);
  };

  useEffect(() => {
    designationListData();
  }, []);

  return (
    <div
      className="modal fade"
      id="modifyEmploymentModal"
      tabIndex="-1"
      aria-labelledby="modifyEmploymentModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modifyEmploymentModal">
              Modify Employment Detail
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
              <Form
                initialValues={data}
                onSubmit={handleJobPost}
                validate={validate}
              >
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
                          <option value="{designation.id}">
                            Select Designation
                          </option>
                          {designationlist?.map((designation) => (
                            <option value={designation.id} key={designation.id}>
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
                            value="1"
                            component={RenderRadioButtonField}
                            type="radio"
                            currentIndex="0"
                          >
                            Yes
                          </Field>
                          <Field
                            name="isCurrentEmployer"
                            value="2"
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
                          min={values.startDate && values.startDate}
                        />
                        <p style={{ color: "red" }}>{errors?.endDate}</p>
                      </div>

                      <div className="form-field flex100">
                        <Field
                          label="Expected Salary"
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
                        >
                          Update Now
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

export default ModifyEmploymentModal;
