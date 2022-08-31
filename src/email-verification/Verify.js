import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Footer from "../components/Footer/index";
import toast from "toastr";
import * as authActions from "../store/action/authActions.js";
import { useDispatch, useSelector } from "react-redux";
import succesgif from "../assets/images/success.gif";
import { verifyEmail } from "../services/authServices";
import { Loader } from "../components/Loader/Loader";

const Verify = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accountStatus, setAccountStatus] = useState(1);

  const verifyEmailtest = async (token, email) => {
    if (token !== "" && email !== "") {
      let resp = await verifyEmail(token, email);

      if (resp.status == 200) {
        const response = resp.data.data;
        setAccountStatus(2);
        if (resp.data.userToken) {
          localStorage.setItem("jobPortalUserToken", resp.data.userToken);
          localStorage.setItem("jobPortalUser", JSON.stringify(response));
        }

        if (resp.status == 200 && response.roles === "Student") {
          let item = localStorage.getItem("jobInvitation");
          let inviteData = JSON.parse(item);
          if (item && item !== undefined) {
            localStorage.removeItem("jobInvitation");
            let path = `invites/${inviteData.status}/${inviteData.jobId}/${inviteData.userId}`;
            navigate(path);
          } else {
            setTimeout(() => {
              toast.success("Login Success");
              navigate("/student/edit-profile");
            }, 3000);
          }
        } else if (resp.status === 200 && response.roles === "Employer") {
          setTimeout(() => {
            toast.success("Login Success");
            navigate("/employer/edit-profile");
          }, 3000);
        }

        dispatch(
          authActions.loginWithToken(resp.data.data, resp.data.userToken)
        );
      } else {
        setAccountStatus(3);
        toast.error(resp?.error ? resp.error : "Something went wrong");
      }
    }
  };
  useEffect(() => {
    let user_data = window.location.href
      .split("?")[1]
      .substring(6)
      .split("&email=");
    let token = user_data[0].split("+").join("%2B") || "";
    let email = user_data[1] || "";

    verifyEmailtest(token, email);
  }, []);
  return (
    <>
      {accountStatus == 1 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "200px",
            marginBottom: "700px",
          }}
        >
          <Loader />
        </div>
      ) : accountStatus == 2 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
            marginBottom: "700px",
          }}
        >
          <img
            src={succesgif}
            alt="email verified"
            height="100px"
            width="100px"
          />
          <h2 style={{ marginTop: "30px" }}>Email verified Successfully</h2>
        </div>
      ) : (
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
            marginBottom: "700px",
          }}
        >
          Something went wrong, please try again
        </h2>
      )}
      <Footer />
    </>
  );
};

export default Verify;
