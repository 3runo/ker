import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../state/store';
import {
  getPatientAction,
  postPatientAction,
  PatientActions,
  PatientsState,
} from '../../state/patients/';
import { postPatient, getPatient, putPatient } from '../../state/patients/api';
import { serializeFormValues } from '../../helpers/dom';
import PatientForm from './';

type $Form = HTMLFormElement | null;
type StateProps = PatientsState;
type OwnProps = {};
type DispatchProps = {
  fetchPatient: (id: string) => { type: PatientActions; payload: any };
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const getFormRef = (): $Form =>
  window.document.querySelector('form[name="patient-form"]');

const mapStateToProps = (state: RootState) => ({ ...state.patients });

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  fetchPatient: function fetchPatientsThunk(id: string) {
    return dispatch(getPatientAction(getPatient('token-here', id)));
  },

  onFormSubmit: function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = serializeFormValues(e);
    const persist = payload.id ? putPatient : postPatient;
    debugger;
    dispatch(
      postPatientAction(
        persist('token-here', payload).then(() => {
          const $patientForm = getFormRef();
          $patientForm && $patientForm.reset();
        })
      )
    );
  },
});

export type PatientFormProps = StateProps & DispatchProps;
export default connect<StateProps, DispatchProps, OwnProps>(
  // @ts-ignore
  mapStateToProps,
  mapDispatchToProps
)(PatientForm as React.SFC<PatientFormProps>);
