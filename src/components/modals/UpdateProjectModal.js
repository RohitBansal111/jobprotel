import { Field, Form } from "react-final-form";
import { RenderTagField } from "../renderTagField";
import {
  renderField,
  RenderFileUploadField,
  renderTextareaField,
  RenderRadioButtonField,
  renderNumberField,
} from "../renderField";
import validate from "./validators/addProjectValidator";
import * as projectServices from "../../services/projectHistorySevices";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "toastr";
import moment from "moment";

const UpdateProjectModal = ({
  editProjectData,
  getProjectHistory,
  activePage,
}) => {
  const authData = useSelector((state) => state.auth.user);
  const [id, setId] = useState("");
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);

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

  const updateProjectHistory = async (values) => {
    if (validation(values)) {
      let data = {
        userId: userId,
        title: values.title,
        description: values.description,
        roleResponsiblity: values.roleResponsiblity,
        projectUrl: values.projectUrl,
        startDate: values.startDate,
        endDate: values.endDate,
        totalTeamSize: values.totalTeamSize,
        // companyEmail: values.companyEmail,
      };
      if (id) {
        const resp = await projectServices.updateProjectHistoryData(id, data);
        console.log(resp, ":::");
        if (resp.status === 200) {
          document.getElementById("UpdateProjectModal").click();
          toast.success(
            resp.data.message ? resp.data.message : "Something went wrong"
          );
          getProjectHistory(id, activePage);
        }
      }
    }
  };

  // useEffect(() => {
  //   if (authData) {
  //     setUserId(authData.id);
  //     console.log(authData.id, ":::")
  //   }
  // }, [authData]);

  useEffect(() => {
    setId(editProjectData.id);
    setUserId(editProjectData.userId);
    setData(editProjectData);
  }, [editProjectData]);
  return (
    <div
      className="modal fade"
      id="UpdateProjectModal"
      tabIndex="-1"
      aria-labelledby="UpdateProjectModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="UpdateProjectModal">
              Update Project
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
                onSubmit={updateProjectHistory}
                validate={validate}
                initialValues={data}
              >
                {({ handleSubmit, submitting, values }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="form-field-group mt-0">
                      <div className="form-field flex100">
                        <Field
                          name="title"
                          label="Title"
                          placeholder="Enter title"
                          component={renderField}
                        />
                      </div>

                      <div className="form-field flex100">
                        <Field
                          name="description"
                          label="Description"
                          placeholder="Enter description"
                          component={renderTextareaField}
                        />
                      </div>
                      <div className="form-field flex100">
                        <Field
                          name="roleResponsiblity"
                          label="Role/Responsiblity"
                          placeholder="Enter Role/Responsiblity"
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex100">
                        <Field
                          name="projectUrl"
                          label="Project-URL"
                          placeholder="Enter Project-URL"
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="startDate"
                          label="Start Date"
                          placeholder="Enter start date"
                          component={renderField}
                          type="date"
                        />
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="endDate"
                          label="End Date"
                          placeholder="Enter end date"
                          component={renderField}
                          type="date"
                          min={data?.startDate}
                        />
                        <p style={{ color: "red" }}>{errors?.endDate}</p>
                      </div>
                      <div className="form-field flex100">
                        <Field
                          label="Team Size"
                          name="totalTeamSize"
                          component={renderNumberField}
                          placeholder="Enter total team size"
                          pattern="[0-9]*"
                        />
                      </div>
                      {/* <div className="form-field flex100">
                        <Field
                          label="Company Email"
                          name="companyEmail"
                          component={renderField}
                          placeholder="Enter company email address"
                          type="text"
                          disabled
                        />
                      </div> */}
                      <div className="form-field flex100 d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary button-submit"
                        >
                          Update
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

export default UpdateProjectModal;
