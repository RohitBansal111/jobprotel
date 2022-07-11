import * as types from "../../types/auth";
import { login } from "../action/authActions";

const initState = {
  isAuthenticated: false,
  token: "",
  isLoading: false,
  errors: "",
};

const authReducers = (state = initState, action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return {
        ...state,
        isLoading: true,
      };
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        token: action.token,
      };

    case types.LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        message: action.payload,
      };

    default:
      return state;
  }
};

export default authReducers;
