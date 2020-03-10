import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
  doSavePatient,
  doSavePatientSuccess,
  doSavePatientFail,
  PatientsState,
  PatientActions
} from "../../state/patients/";
import PatientForm from "./index";
import { postPatient } from "../../helpers/api";
import { createFormPayload } from "../../helpers/dom";

const mapStateToProps = (state: any) => ({ ...state.patients });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onFormSubmit: function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const payload = createFormPayload(form.querySelectorAll('[name*="input"]'));

    dispatch(doSavePatient(payload));
    return postPatient("inform-token-here", payload)
      .then((response: any) => dispatch(doSavePatientSuccess(response)))
      .catch((response: any) => dispatch(doSavePatientFail(response)));
  }
});

type TMap = { onFormSubmit: () => { type: PatientActions; payload: Object } };
export type TProps = PatientsState & TMap;
export default connect(mapStateToProps, mapDispatchToProps)(PatientForm);
