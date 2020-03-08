import { connect } from "react-redux";
import {
  fetchPatientsAction,
  PatientsState
} from "../../state/reducers/patients/";
import PatientList from "./index";
import { AppDispatch } from "../../state/store";

function mapStateToProps(state: any) {
  const stateFromStore = { ...state.patients };
  return stateFromStore;
}

function mapDispatchToProps(dispatch: AppDispatch): unknown {
  return {
    fetchPatients: () => dispatch(fetchPatientsAction({ a: 1 }))
  };
}

export type TProps = PatientsState & {
  fetchPatients: () => { type: string; payload: Object };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
