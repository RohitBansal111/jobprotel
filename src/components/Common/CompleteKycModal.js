import { Field, Form } from "react-final-form";
import validate from "./kycValidation";
import { renderField, RenderFileUploadField } from "./../renderField";
import { useEffect, useState } from "react";
import * as studentServices from "../../services/studentServices";
import toast from "toastr";
import { useDispatch, useSelector } from "react-redux";
import * as types from "../../types/auth";

const CompleteKycModal = ({ jobList, studentData }) => {
  const authData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [studentId, setStudentId] = useState("");
  const [mainfile, setMainfile] = useState({});
  const [backfile, setBackfile] = useState({});
  const [err, setErr] = useState([]);

  const handleFrontSide = (e) => {
    let files = e.target.files[0];
    setMainfile(files);
  };

  const handleBackSide = (e) => {
    let files = e.target.files[0];
    setBackfile(files);
  };

  const validations = () => {
    let error = {};
    let isValid = true;
    if (!mainfile) {
      error.mainfile = "Required Front Id Proof Photo";
      isValid = false;
    }
    if (!backfile) {
      error.backSideFile = "Required Back Id Proof Photo";
      isValid = false;
    }
    setErr(error);
    return isValid;
  };

  const handleSubmitKycForm = async (values) => {
    let formData = new FormData();
    formData.append("StudentId", studentId);
    formData.append("documentTitle", values.documentTitle);
    formData.append("mainFile", mainfile);
    formData.append("backSideFile", backfile);
    formData.append("remarks", values.remarks);

    if (studentId) {
      if (validations()) {
        const resp = await studentServices.sendStudentKycData(formData);
        if (resp.status === 200) {
          document.getElementById("kycpopup").click();
          toast.success(
            resp.data.message ? resp.data.message : "Something went wrong"
          );
          const resp2 = await studentServices.getStudentDetails(studentId);
          dispatch({
            type: types.LOGIN_USER_SUCCESS,
            payload: resp2.data.data,
            token: localStorage.getItem("jobPortalUserToken"),
          });

          // setMainfile({name: ""});
          // setBackfile("");
          values.remarks = "";
          values.documentTitle = "";
        }
      }
    }
  };

  useEffect(() => {
    setStudentId(authData && authData.id);
  }, [authData]);
  return (
    <div
      className="modal fade"
      id="kycpopup"
      tabIndex="-1"
      aria-labelledby="kycLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="kycLabel">
              KYC Detail
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
              <Form onSubmit={handleSubmitKycForm} validate={validate}>
                {({ handleSubmit, submitting, values }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="form-field-group mt-0">
                      <div className="form-field flex50">
                        <Field
                          name="documentTitle"
                          label="Document Title"
                          placeholder="Enter Document Title"
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="remarks"
                          label="Remarks"
                          placeholder="Enter email address"
                          component={renderField}
                        />
                      </div>
                      <label>Front Id Proof</label>
                      <div className="form-field flex100">
                        <input
                          name="mainFile"
                          onChange={handleFrontSide}
                          type="file"
                          accept=".jpg, .jpeg, .png, application/pdf, .doc"
                        />
                        <p>{err && err.mainfile}</p>
                      </div>
                      <label>Back Id Proof</label>
                      <div className="form-field flex100">
                        <input
                          name="backSideFile"
                          onChange={handleBackSide}
                          type="file"
                          accept=".jpg, .jpeg, .png, application/pdf, .doc"
                        />
                        <p>{err && err.backSideFile}</p>
                      </div>
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

export default CompleteKycModal;
