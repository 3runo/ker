import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
  fetchPatientsAction,
  PatientsState
} from "../../state/reducers/patients/";
import PatientList from "./index";

function mapStateToProps(state: any) {
  return { ...state.patients };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchPatients: () => dispatch(fetchPatientsAction({ a: 1 }))
  };
}

export type TProps = PatientsState & {
  fetchPatients: () => { type: string; payload: Object };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
