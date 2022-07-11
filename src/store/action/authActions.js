import * as types from "../../types/auth";
import { loginUser } from "../../services/authServices";
import toast from "toastr";

export const login = (user, navigate) => {
  toast.options = { preventDuplicates: true };
  return async (dispatch) => {
    try {
      let resp = await loginUser(user);
      const response = resp.data.data;
      console.log(resp, "response");
      
      dispatch({ type: types.LOGIN_USER });
      if (resp.status === 200) {
        if (resp.status === 200 && response.roles === "STUDENT") {
          toast.success("Login Successfully");
          navigate("/find-work");
        } else if (resp.status === 200 && response.roles === "EMPLOYER") {
          toast.success("Login Successfully");
          navigate("/posted-jobs");
        } else if (resp.status === 400) {
          toast.error(resp.error ? resp.error : "Something went wrong");
        }
        if(resp.data.userToken) {
          localStorage.setItem("jobPortalUserToken", resp.data.userToken)
          localStorage.setItem("jobPortalUser", JSON.stringify(response))
        }
        dispatch({
          type: types.LOGIN_USER_SUCCESS,
          payload: resp.data.data,
          token: resp.data.userToken,
        });
      } else {
        dispatch({
          type: types.LOGIN_USER_FAILURE,
          payload: resp.error,
        });
      }
    } catch (e) {
      dispatch({
        type: types.LOGIN_USER_FAILURE,
        payload: e.message,
      });
    }
  };
};
