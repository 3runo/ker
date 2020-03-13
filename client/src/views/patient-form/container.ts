import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../state/store';
import { postPatientAction, PatientsState } from '../../state/patients/';
import { postPatient } from '../../state/patients/api';
import { serializeFormValues } from '../../helpers/dom';
import PatientForm from './';

type StateProps = PatientsState;
type OwnProps = {};
type DispatchProps = {
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const mapStateToProps = (state: RootState) => ({ ...state.patients });

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onFormSubmit: function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = serializeFormValues(e);
    dispatch(
      postPatientAction(
        postPatient('token-here', payload).then((res) => {
          const form: HTMLFormElement | null = window.document.querySelector(
            'form[name="patient-form"]'
          );
          form && form.reset();
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
