import { combineReducers } from "redux";
import * as keys from "./featureKeys";
import authReducer from "./reducers/authReducers";

export const rootReducer = combineReducers({
  [keys.authFeatureKey]: authReducer,
});
