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
import { getPatients, deletePatient } from "../../state/patients/api";
import PatientList from "./";

type TMap = {
  fetchPatients: () => { type: PatientActions; payload: Object },
  deletePatient: (uuid: string, callback?: Function) => { type: PatientActions; payload: Object }
};
export type TProps = PatientsState & TMap;

const mapStateToProps = (state: any) => ({ ...state.patients });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchPatients: function fetchPatientsThunk(payload: Object) {
    dispatch(doFetchPatients(payload));
    return getPatients("inform-token-here")
      .then(res => dispatch(doFetchPatientsSuccess(res)))
      .catch(res => dispatch(doFetchPatientsFail(res)));
  },

  deletePatient: function deletePatientThunk(uuid: string, callback?: Function) {
    dispatch(doDeletePatient(uuid));
    return deletePatient("inform-token-here", uuid)
      .then(res => {
        dispatch(doDeletePatientSuccess(res))
        if (typeof callback === "function") callback();
      })
      .catch(res => dispatch(doDeletePatientFail(res)));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
