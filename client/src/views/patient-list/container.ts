import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
  doFetchPatients,
  doFetchPatientsSuccess,
  doFetchPatientsFail,
  doDeletePatient,
  doDeletePatientSuccess,
  doDeletePatientFail,
  PatientsState,
  PatientActions
} from "../../state/patients/";
import PatientList from "./index";
import { getPatients, deletePatient } from "../../helpers/api";

const mapStateToProps = (state: any) => ({ ...state.patients });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchPatients: function fetchPatientsThunk(payload: Object) {
    dispatch(doFetchPatients(payload));

    return getPatients("inform-token-here")
      .then(response => dispatch(doFetchPatientsSuccess(response)))
      .catch(response => dispatch(doFetchPatientsFail(response)));
  },
  deletePatient: function deletePatientThunk(uuid: string) {
    dispatch(doDeletePatient(uuid));

    // TODO: Call fetchPatients when deletion succeed
    return deletePatient("inform-token-here", uuid)
      .then(response => dispatch(doDeletePatientSuccess(response)))
      .catch(response => dispatch(doDeletePatientFail(response)));
  }
});

type TMap = {
  fetchPatients: () => { type: PatientActions; payload: Object },
  deletePatient: (uuid: string) => { type: PatientActions; payload: Object }
};
export type TProps = PatientsState & TMap;
export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
