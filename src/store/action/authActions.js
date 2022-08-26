import * as types from "../../types/auth";
import { loginUser } from "../../services/authServices";
import toast from "toastr";

export const login = (user, navigate) => {
  let data = {
    userName: user?.userName,
    password: user?.password.trim()
  }
  toast.options = { preventDuplicates: true };
  return async (dispatch) => {
    try {
      let resp = await loginUser(data);

      if (resp.status === 200) {
        const response = resp.data.data;
        if (resp.data.userToken) {
          localStorage.setItem("jobPortalUserToken", resp.data.userToken);
          localStorage.setItem("jobPortalUser", JSON.stringify(response));
        }

        if (resp.status === 200 && response.roles === "Student") {
          toast.success("Login Successfully");
          let item = localStorage.getItem("jobInvitation");
          let inviteData = JSON.parse(item);
          if (item && item !== undefined) {
            localStorage.removeItem("jobInvitation");
            let path = `invites/${inviteData.status}/${inviteData.jobId}/${inviteData.userId}`;
            navigate(path);
          } else {
            navigate("/find-work");
          }
        } else if (resp.status === 200 && response.roles === "Employer") {
          toast.success("Login Success");
          navigate("/posted-jobs");
        }

        dispatch({
          type: types.LOGIN_USER_SUCCESS,
          payload: resp.data.data,
          token: resp.data.userToken,
        });
      } else {
        toast.error(resp.error ? resp.error : "Something went wrong");
      }
    } catch (e) {
      dispatch({
        type: types.LOGIN_USER_FAILURE,
        payload: e.message,
      });
    }
  };
};
