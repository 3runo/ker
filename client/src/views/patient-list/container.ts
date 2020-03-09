import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
  fetchPatientsAction,
  fetchPatientsSuccessAction,
  fetchPatientsFailAction,
  PatientsState,
  PatientActions
} from "../../state/patients/";
import PatientList from "./index";
import { getPatients } from "../../helpers/api";

const mapStateToProps = (state: any) => ({ ...state.patients });
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchPatients: function fetchPatientsThunk(payload: Object) {
    dispatch(fetchPatientsAction(payload));

    return getPatients("token")
      .then(response => dispatch(fetchPatientsSuccessAction(response)))
      .catch(response => dispatch(fetchPatientsFailAction(response)));
  }
});

type TMap = { fetchPatients: () => { type: PatientActions; payload: Object } };
export type TProps = PatientsState & TMap;
export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
