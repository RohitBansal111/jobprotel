import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
// import { createNotification } from "../helper/notification";
import Footer from "../components/Footer/index";
import toast from "toastr";

const Verify = (props) => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const { token } = useParams();

  const verifyEmail = () => {
    // authServices
    //   .accountActivationAction(token)
    //   .then((result) => {
    //     console.log(result, "--result");

        // if (result.status === 200) {
        //   console.log("result", result.message, "success");
        //   toast.success(
        //     result.data.message ? result.data.message : "Something went wrong"
        //   );
        //   setTimeout(() => {
        //     navigate(`/PricingInfo/${result.data.data._id}`, {
        //       state: {
        //         email: result.data.data.email,
        //         password: result.data.data.password,
        //       },
        //     });
        //   }, 2000);
        // } else  if (result.error) {
        //   setShowError(true);
        //   toast.error(
        //     result.error ? result.error : "Something went wrong"
        //   );
        // }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
  useEffect(() => {
    verifyEmail()
  }, []);
  return (
    <>
      <div>
        <Container>
          <div>
            <h2>Email Verification</h2>
            <div>
              <h4>
                {showError ? "Some issue in activation" : "Account Activated"}
              </h4>
            </div>
          </div>
          <ToastContainer autoClose={5000} />
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Verify;
