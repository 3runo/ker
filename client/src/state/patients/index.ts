import omit from 'lodash/fp/omit';
import { Patient } from '../../types/patients';

// Types
export type PatientActions =
  | 'PATIENTS_FETCH'
  | 'PATIENTS_FETCH_SUCCESS'
  | 'PATIENTS_FETCH_FAIL'
  | 'PATIENT_FETCH'
  | 'PATIENT_FETCH_SUCCESS'
  | 'PATIENT_FETCH_FAIL'
  | 'PATIENT_SAVE'
  | 'PATIENT_SAVE_SUCCESS'
  | 'PATIENT_SAVE_FAIL'
  | 'PATIENT_DELETE'
  | 'PATIENT_DELETE_SUCCESS'
  | 'PATIENT_DELETE_FAIL';

export type PatientsState = {
  current: Patient | undefined;
  list: Array<Patient>;
  errorMap: { fetching?: string; saving?: string; removing?: string };
  loadingMap: { fetching?: boolean; saving?: boolean; removing?: boolean };
};

export type PatientsAction<T = any> = {
  type: PatientActions;
  payload: T;
};

export const initialState: PatientsState = {
  current: undefined,
  list: [],
  errorMap: {},
  loadingMap: {},
};

const omitFetching = omit(['fetching']);
const omitSaving = omit(['saving']);
const omitRemoving = omit(['removing']);

// Reducer
export function patientsReducer(
  state: PatientsState = initialState,
  action: PatientsAction
): PatientsState {
  if (action.type === 'PATIENTS_FETCH') {
    return {
      ...state,
      loadingMap: { ...state.loadingMap, fetching: true },
      errorMap: omitFetching(state.errorMap),
    };
  }

  if (action.type === 'PATIENTS_FETCH_SUCCESS') {
    return {
      ...state,
      list: action.payload,
      loadingMap: omitFetching(state.loadingMap),
      errorMap: omitFetching(state.errorMap),
    };
  }

  if (action.type === 'PATIENTS_FETCH_FAIL') {
    return {
      ...state,
      loadingMap: omitFetching(state.loadingMap),
      errorMap: { ...state.errorMap, fetching: action.payload },
    };
  }

  if (action.type === 'PATIENT_FETCH') {
    return {
      ...state,
      loadingMap: { ...state.loadingMap, fetching: true },
      errorMap: omitFetching(state.errorMap),
    };
  }

  if (action.type === 'PATIENT_FETCH_SUCCESS') {
    return {
      ...state,
      current: action.payload,
      loadingMap: omitFetching(state.loadingMap),
      errorMap: omitFetching(state.errorMap),
    };
  }

  if (action.type === 'PATIENT_FETCH_FAIL') {
    return {
      ...state,
      loadingMap: omitFetching(state.loadingMap),
      errorMap: { ...state.errorMap, fetching: action.payload },
    };
  }

  if (action.type === 'PATIENT_SAVE') {
    return {
      ...state,
      loadingMap: { ...state.loadingMap, saving: true },
      errorMap: omitSaving(state.errorMap),
    };
  }

  if (action.type === 'PATIENT_SAVE_SUCCESS') {
    return {
      ...state,
      current: undefined,
      loadingMap: omitSaving(state.loadingMap),
      errorMap: omitSaving(state.errorMap),
    };
  }

  if (action.type === 'PATIENT_SAVE_FAIL') {
    return {
      ...state,
      loadingMap: omitSaving(state.loadingMap),
      errorMap: { ...state.errorMap, saving: action.payload },
    };
  }

  if (action.type === 'PATIENT_DELETE') {
    return {
      ...state,
      loadingMap: { ...state.loadingMap, removing: true },
      errorMap: omitRemoving(state.errorMap),
    };
  }

  if (action.type === 'PATIENT_DELETE_SUCCESS') {
    return {
      ...state,
      loadingMap: omitRemoving(state.loadingMap),
      errorMap: omitRemoving(state.errorMap),
    };
  }

  if (action.type === 'PATIENT_DELETE_FAIL') {
    return {
      ...state,
      loadingMap: omitRemoving(state.loadingMap),
      errorMap: { ...state.errorMap, removing: action.payload },
    };
  }

  return state;
}

// Actions Creators
function actionCreator(type: PatientActions) {
  return function action(payload: any) {
    return { type, payload };
  };
}

export const getPatientsAction = actionCreator('PATIENTS_FETCH');
export const getPatientAction = actionCreator('PATIENT_FETCH');
export const postPatientAction = actionCreator('PATIENT_SAVE');
export const deletePatientAction = actionCreator('PATIENT_DELETE');
