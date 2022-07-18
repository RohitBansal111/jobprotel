import { Field, Form } from "react-final-form";
import validate from "./kycValidation";
import { renderField, RenderFileUploadField } from "./../renderField";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as studentServices from "../../services/studentServices";

const CompleteKycModal = () => {
  const authData = useSelector((state) => state.auth.user);

  const [studentId, setStudentId] = useState("");
  const [mainfile, setMainfile] = useState("");
  const [backfile, setBackfile] = useState("");
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

    if (
      studentId &&
      mainfile &&
      backfile &&
      values.remarks &&
      values.documentTitle
    ) {
      const resp = await studentServices.sendStudentKycData(formData);
      console.log(resp);
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
                          // uploadLabel="Browse Photo"
                          // component={RenderFileUploadField}
                          onChange={handleFrontSide}
                          type="file"
                          accept=".jpg, .jpeg, .png, application/pdf, .doc"
                        />
                      </div>
                      <label>Back Id Proof</label>
                      <div className="form-field flex100">
                        <input
                          name="backSideFile"
                          // uploadLabel="Browse Photo"
                          // component={RenderFileUploadField}
                          onChange={handleBackSide}
                          type="file"
                          accept=".jpg, .jpeg, .png, application/pdf, .doc"
                        />
                      </div>
                      <div className="form-field flex100 d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary button-submit"
                          onClick={() => handleSubmitKycForm(values)}
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
