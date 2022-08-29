import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
// import { createNotification } from "../helper/notification";
import Footer from "../components/Footer/index";
import toast from "toastr";
import * as authServices from "../services/authServices";

const Verify = (props) => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  //   const { token, email } = useParams();

  const verifyEmail = (token, email) => {
    authServices
      .verifyEmail(token, email)
      .then((result) => {
        console.log(result.data.data, "::");

        if (result.status === 200) {
          toast.success(
            "Account activated successfully"
          );
            setTimeout(() => {

              navigate(`/`, {
                state: {
                  email: result.data.data.email,
                  password: result.data.data.password,
                },
              });
            }, 2000);
        } else if (result.status !== 200) {
          setShowError(true);
          toast.error(result.error ? result.error : "Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    let user_data = window.location.href
      .split("?")[1]
      .substring(6)
      .split("&email=");
    let token = user_data[0].split("+").join("%2B")
    let email = user_data[1]

    verifyEmail(token, email);
    // console.log("::", user_data);
    // console.log("::token", token);
    // console.log("::email", email);
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
