import { combineReducers } from "redux";
import { patientsReducer } from "./patients";

export default combineReducers({
  patients: patientsReducer
});
