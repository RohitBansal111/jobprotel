import initialState from './initialState'

const authReducer = (state =initialState.auth, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESSFUL':  
        return {
              ...state, 
              ...action.payload,
              token: action.loginResult.token,
              loggedIn: true,
              user: action.payload 
        }
      case 'LOGIN_FAILURE': 
          return {
            ...state, 
            loggedIn: false,
            user: null
          }
      case 'LOGOUT': 
        return {
            ...state, 
            token: "", 
            user: null
        } 
      default:
        return state;
    }
}

export default authReducer
