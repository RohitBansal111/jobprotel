import * as types from "../../types/auth";
import { loginUser } from "../../services/authServices";
import toast from "toastr";

export const login = (user, navigate) => {
  toast.options = { preventDuplicates: true };
  return async (dispatch) => {
    try {
      let resp = await loginUser(user);

      if (resp.status === 200) {
        const response = resp.data.data
        if (resp.status === 200 && response.roles === "STUDENT") {
          toast.success("Login Successfully");
          navigate("/find-work");
        } else if (resp.status === 200 && response.roles === "EMPLOYER") {
          toast.success("Login Successfully");
          navigate("/posted-jobs");
        } 
        // if(resp.data.userToken) {
        //   localStorage.setItem("jobPortalUserToken", resp.data.userToken)
        //   localStorage.setItem("jobPortalUser", JSON.stringify(response))
        // }
        dispatch({
          type: types.LOGIN_USER_SUCCESS,
          payload: resp.data.data,
          token: resp.data.userToken,
        });
      } else {
        toast.error(resp.error ? resp.error : "Something went wrong");
        // dispatch({
        //   type: types.LOGIN_USER_FAILURE,
        //   payload: resp.error,
        // });
      }
    } catch (e) {
      dispatch({
        type: types.LOGIN_USER_FAILURE,
        payload: e.message,
      });
    }
  };
};
