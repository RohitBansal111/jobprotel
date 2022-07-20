import { Field, Form } from "react-final-form";
import { RenderTagField } from "../renderTagField";
import {
  renderField,
  RenderFileUploadField,
  renderTextareaField,
  RenderRadioButtonField,
  renderNumberField,
} from "./../renderField";
import validate from "./validators/addProjectValidator";
import * as projectServices from "../../services/projectHistorySevices";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "toastr";

const AddProjectModal = ({getProjectHistory}) => {
  const authData = useSelector((state) => state.auth.user);
  const [id, setId] = useState("");
  
  const saveProjectHistory = async (values) => {
    let data = { userId: id, ...values };
    const {title, description, roleResponsiblity, projectUrl, startdate, enddate, totalTeamSize, companyEmail} = values
    if(title&& description&& roleResponsiblity&& projectUrl&& startdate&& enddate&& totalTeamSize&& companyEmail){
      const resp = await projectServices.postProjectHistoryData(data);
      console.log(resp);
      if(resp.status === 200) {
       document.getElementById("addProjectModal").click(); 
        toast.success(
          resp.data.message ? resp.data.message : "Something went wrong"
        );
        getProjectHistory(id)
      }
    }
  };

  useEffect(() => {
    if (authData) {
      setId(authData.id);
    }
  }, [authData]);

  return (
    <div
      className="modal fade"
      id="addProjectModal"
      tabIndex="-1"
      aria-labelledby="addProjectModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addProjectModal">
              Add Project
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
              <Form onSubmit={saveProjectHistory} validate={validate}>
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
                          name="startdate"
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
                        />
                      </div>
                      <div className="form-field flex100">
                        {/* <label htmlFor="certificate"> Status </label>
                        <div className="radio-button-groupss">
                          <Field
                            name="status"
                            value="No"
                            component={RenderRadioButtonField}
                            type="radio"
                            currentIndex="0"
                          >
                            No
                          </Field>
                          <Field
                            name="status"
                            value="Yes"
                            component={RenderRadioButtonField}
                            type="radio"
                            currentIndex="1"
                          >
                            Yes
                          </Field>
                        </div> */}
                      </div>
                      <div className="form-field flex100">
                        <label htmlFor="teamSize"> Team Size </label>
                        <Field
                          name="totalTeamSize"
                          component={renderNumberField}
                          placeholder="Enter total team size"
                          pattern="[0-9]*"
                        />
                      </div>
                      <div className="form-field flex100">
                        <label htmlFor="teamSize"> Company Email </label>
                        <Field
                          name="companyEmail"
                          component={renderField}
                          placeholder="Enter company email address"
                          type="text"
                        />
                      </div>
                      <div className="form-field flex100 d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary button-submit"
                          onClick={() => saveProjectHistory(values)}
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

export default AddProjectModal;
