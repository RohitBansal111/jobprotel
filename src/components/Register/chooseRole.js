import Student from "./../../assets/icons/student.png";
import Employer from "./../../assets/icons/employer.png";
import ActiveStudent from "./../../assets/icons/active-student.png";
import ActiveEmployer from "./../../assets/icons/active-employer.png";
import { Field, Form } from "react-final-form";
import ChooseRoleValidate from "./validator/chooseValidate";
import { RenderRadioButtonField } from "../renderField";

const ChooseRole = ({role,nextPage, selectRole}) => {
  const SaveChooseRole = () => {
    nextPage();
  };
  const handleStudentRole = () => {
    selectRole("Student");
  };
  const handleEmployerRole = () => {
    selectRole("Employer");
  };

  return (
    <div className="register-form">
      <h2 className="text-primary text-center">Choose a role</h2>
      <div className="form-main">
        <Form
          initialValues={{ role: "Student" }}
          onSubmit={SaveChooseRole}
          validate={ChooseRoleValidate}
        >
          {({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="choose-role-box">
                <div
                  className={
                    role === "Student" ? "role-box active" : "role-box"
                  }
                  onClick={handleStudentRole}
                >
                  <Field
                    name="role"
                    type="radio"
                    value="Student"
                    component={RenderRadioButtonField}
                  />
                  <div className="role-icon">
                    <img src={Student} alt="Student Role" />
                    <img src={ActiveStudent} alt="Student Role" />
                    <h4>STUDENT</h4>
                  </div>
                </div>
                <div
                  className={
                    role === "Employer" ? "role-box active" : "role-box"
                  }
                  onClick={handleEmployerRole}
                >
                  <Field
                    name="role"
                    type="radio"
                    value="Employer"
                    component={RenderRadioButtonField}
                  />
                  <div className="role-icon">
                    <img src={Employer} alt="Employer Role" />
                    <img src={ActiveEmployer} alt="Employer Role" />
                    <h4>EMPLOYER</h4>
                  </div>
                </div>
              </div>
              <div className="form-action">
                <button
                  type="submit"
                  className="btn btn-primary w-100 next-btn text-white text-center"
                >
                  {" "}
                  Next{" "}
                </button>
              </div>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};

export default ChooseRole;
