import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../state/store';
import {
  doFetchPatients,
  doFetchPatientsSuccess,
  doFetchPatientsFail,
  doDeletePatient,
  doDeletePatientSuccess,
  doDeletePatientFail,
  PatientsState,
  PatientActions,
} from '../../state/patients/';
import { getPatients, deletePatient } from '../../state/patients/api';
import PatientList from './';

type StateProps = PatientsState;
type OwnProps = {};
type DispatchProps = {
  fetchPatients: () => Promise<void | { type: PatientActions; payload: any }>;
  deletePatient: (
    uuid: string,
    callback?: Function
  ) => Promise<void | { type: PatientActions; payload: any }>;
};

const mapStateToProps = (state: RootState) => ({ ...state.patients });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchPatients: function fetchPatientsThunk(payload: Object) {
    dispatch(doFetchPatients(payload));
    return getPatients('inform-token-here')
      .then((res) => dispatch(doFetchPatientsSuccess(res)))
      .catch((res) => dispatch(doFetchPatientsFail(res)));
  },

  deletePatient: function deletePatientThunk(
    uuid: string,
    callback?: Function
  ) {
    dispatch(doDeletePatient(uuid));
    return deletePatient('inform-token-here', uuid)
      .then((res) => {
        dispatch(doDeletePatientSuccess(res));
        if (typeof callback === 'function') callback();
      })
      .catch((res) => dispatch(doDeletePatientFail(res)));
  },
});

export type PatientListProps = StateProps & DispatchProps;
export default connect<StateProps, DispatchProps, OwnProps>(
  // @ts-ignore
  mapStateToProps,
  mapDispatchToProps
)(PatientList as React.SFC<PatientListProps>);
