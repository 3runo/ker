import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../state/store';
import {
  getPatientsAction,
  deletePatientAction,
  PatientsState,
  PatientActions,
} from '../../state/patients/';
import { getPatients, deletePatient } from '../../state/patients/api';
import PatientList from './';

type StateProps = PatientsState;
type OwnProps = {};
type DispatchProps = {
  fetchPatients: () => { type: PatientActions; payload: any };
  deletePatient: (
    uuid: string,
    callback?: Function
  ) => Promise<void | { type: PatientActions; payload: any }>;
};

const mapStateToProps = (state: RootState) => ({ ...state.patients });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchPatients: function fetchPatientsThunk() {
    return dispatch(getPatientsAction(getPatients()));
  },

  deletePatient: function deletePatientThunk(id: string, callback?: Function) {
    return dispatch(
      deletePatientAction(
        deletePatient(id).then(() => {
          typeof callback === 'function' && callback();
        })
      )
    );
  },
});

export type PatientListProps = StateProps & DispatchProps;
export default connect<StateProps, DispatchProps, OwnProps>(
  // @ts-ignore
  mapStateToProps,
  mapDispatchToProps
)(PatientList as React.SFC<PatientListProps>);
