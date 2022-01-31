import { saveState } from "../store/localStorage"
import { getInstance } from "./axiosFactory"
import { get } from "lodash"
const axiosInstance = getInstance();

export function loginSuccess(loginResult) {
  return { type: "LOGIN_SUCCESSFUL", loginResult };
}

export function loginFailure(failure) {
  return { type: "LOGIN_FAILURE", failure };
}

export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    axiosInstance.post('/account/login', {
      userid: username,
      password: password,
      loginWith: 'form'
    })
      .then((result) => {

        saveState({ auth: { ...get(result, "data"), loggedIn: true } });
        resolve(result.data);
        //dispatch(loginSuccess(result.data));
      })
      .catch((error) => {
        // dispatch(loginFailure(error));
        reject(error.message);
      })
  })

}




