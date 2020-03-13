import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../state/store';
import {
  postPatientAction,
  PatientsState,
  PatientActions,
} from '../../state/patients/';
import { postPatient } from '../../state/patients/api';
import { serializeFormValues } from '../../helpers/dom';
import PatientForm from './';

type StateProps = PatientsState;
type OwnProps = {};
type DispatchProps = {
  onFormSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => { type: PatientActions; payload: any };
};

const mapStateToProps = (state: RootState) => ({ ...state.patients });

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onFormSubmit: function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = serializeFormValues(e);
    return dispatch(postPatientAction(postPatient('token-here', payload)));
  },
});

export type PatientFormProps = StateProps & DispatchProps;
export default connect<StateProps, DispatchProps, OwnProps>(
  // @ts-ignore
  mapStateToProps,
  mapDispatchToProps
)(PatientForm as React.SFC<PatientFormProps>);
