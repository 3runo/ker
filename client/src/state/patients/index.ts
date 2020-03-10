import { omit } from 'lodash/fp';
import { Patient } from "../../types/patients";

// Types
export type PatientActions =
  | "PATIENTS_FETCH"
  | "PATIENTS_FETCH_SUCCESS"
  | "PATIENTS_FETCH_FAIL"
  | "PATIENTS_SAVE"
  | "PATIENTS_SAVE_SUCCESS"
  | "PATIENTS_SAVE_FAIL"
  | "PATIENTS_DELETE"
  | "PATIENTS_DELETE_SUCCESS"
  | "PATIENTS_DELETE_FAIL";

export type PatientsState = {
  list: Array<Patient>;
  loadingMap: { fetching?: boolean; saving?: boolean; removing?: boolean };
  errorMap: { fetching?: string; saving?: string; removing?: string };
};

export type PatientsAction<T = any> = {
  type: PatientActions;
  payload: T;
};

export const initialState: PatientsState = {
  list: [],
  loadingMap: {},
  errorMap: {}
};

const omitFetching = omit(['fetching']);
const omitSaving = omit(['saving']);
const omitRemoving = omit(['removing']);

// Reducer
export function patientsReducer(
  state: PatientsState = initialState,
  action: PatientsAction
): PatientsState {
  if (action.type === "PATIENTS_FETCH") {
    return {
      ...state,
      loadingMap: { ...state.loadingMap, fetching: true },
      errorMap: omitFetching(state.errorMap),
    };
  }

  if (action.type === "PATIENTS_FETCH_SUCCESS") {
    return {
      list: action.payload,
      loadingMap: omitFetching(state.loadingMap),
      errorMap: omitFetching(state.errorMap)
    };
  }

  if (action.type === "PATIENTS_FETCH_FAIL") {
    return {
      ...state,
      loadingMap: omitFetching(state.loadingMap),
      errorMap: { ...state.errorMap, fetching: action.payload }
    };
  }

  if (action.type === "PATIENTS_SAVE") {
    return {
      ...state,
      loadingMap: { ...state.loadingMap, saving: true },
      errorMap: omitSaving(state.errorMap),
    };
  }

  if (action.type === "PATIENTS_SAVE_SUCCESS") {
    return {
      ...state,
      loadingMap: omitSaving(state.loadingMap),
      errorMap: omitSaving(state.errorMap)
    };
  }

  if (action.type === "PATIENTS_SAVE_FAIL") {
    return {
      ...state,
      loadingMap: omitSaving(state.loadingMap),
      errorMap: { ...state.errorMap, saving: action.payload }
    };
  }

  if (action.type === "PATIENTS_DELETE") {
    return {
      ...state,
      loadingMap: { ...state.loadingMap, removing: true },
      errorMap: omitRemoving(state.errorMap),
    };
  }

  if (action.type === "PATIENTS_DELETE_SUCCESS") {
    return {
      ...state,
      loadingMap: omitRemoving(state.loadingMap),
      errorMap: omitRemoving(state.errorMap)
    };
  }

  if (action.type === "PATIENTS_DELETE_FAIL") {
    return {
      ...state,
      loadingMap: omitRemoving(state.loadingMap),
      errorMap: { ...state.errorMap, removing: action.payload }
    };
  }

  return state;
}

// Actions Creators
function actionCreator(type: PatientActions) {
  return function action(payload: any) {
    return { type, payload };
  }
}

export const doFetchPatients = actionCreator("PATIENTS_FETCH");
export const doFetchPatientsSuccess = actionCreator("PATIENTS_FETCH_SUCCESS");
export const doFetchPatientsFail = actionCreator("PATIENTS_FETCH_FAIL");

export const doSavePatient = actionCreator("PATIENTS_SAVE");
export const doSavePatientSuccess = actionCreator("PATIENTS_SAVE_SUCCESS");
export const doSavePatientFail = actionCreator("PATIENTS_SAVE_FAIL");

export const doDeletePatient = actionCreator("PATIENTS_DELETE");
export const doDeletePatientSuccess = actionCreator("PATIENTS_DELETE_SUCCESS");
export const doDeletePatientFail = actionCreator("PATIENTS_DELETE_FAIL");