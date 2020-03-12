import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  doSavePatient,
  doSavePatientSuccess,
  doSavePatientFail,
  PatientsState,
  PatientActions,
} from '../../state/patients/';
import { postPatient } from '../../state/patients/api';
import { serializeFormValues } from '../../helpers/dom';
import PatientForm from './';

type TMap = {
  onFormSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => { type: PatientActions; payload: Object };
};
export type TProps = PatientsState & TMap;

const mapStateToProps = (state: any) => ({ ...state.patients });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onFormSubmit: function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = serializeFormValues(e);

    dispatch(doSavePatient(payload));
    return postPatient('inform-token-here', payload)
      .then((res) => {
        dispatch(doSavePatientSuccess(res));
      })
      .catch(({ message }) => dispatch(doSavePatientFail(message)));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientForm);
