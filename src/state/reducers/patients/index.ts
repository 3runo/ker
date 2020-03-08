import { Patient } from "../../../types/patients";

export type PatientsState = {
  list: Array<Patient>;
  loadingMap: { fetching?: boolean; saving?: boolean };
  errorMap: { fetching?: string; saving?: string };
};

export const initialState: PatientsState = {
  list: [
    {
      firstContact: "firstContact",
      notes: "notes",
      created: 1581367248383,
      uuid: "115e02f6-e88d-409c-97a1-1c3713048894",
      address: "address",
      email: "name@domain.com",
      phone: "phone",
      name: "name",
      birthday: "birthday"
    },
    {
      firstContact: "firstContact",
      notes: "notes",
      created: 1581367170428,
      uuid: "e54e4a5f-aaf7-4048-8900-00bc5b21ae6a",
      address: "address",
      email: "name@domain.com",
      phone: "phone",
      name: "name",
      birthday: "birthday"
    },
    {
      firstContact: "firstContact",
      notes: "notes",
      created: 1581367167488,
      uuid: "9bbe2f77-8757-416e-8e49-05add223c3e9",
      address: "address",
      email: "name@domain.com",
      phone: "phone",
      name: "name",
      birthday: "birthday"
    },
    {
      firstContact: "firstContact",
      notes: "notes",
      created: 1581367183149,
      uuid: "2a7179c3-aaac-4c57-ba49-a54dc05828c2",
      address: "address",
      email: "name@domain.com",
      phone: "phone",
      name: "name",
      birthday: "birthday"
    }
  ],
  loadingMap: {},
  errorMap: {}
};

// ACTIONS
export function fetchPatientsAction(payload: Object) {
  return {
    type: "PATIENTS_FETCH",
    payload
  };
}

// REDUCER
export function patientsReducer(
  state: PatientsState = initialState,
  action: any
) {
  if (action.type === "PATIENTS_FETCH") {
    return {
      ...state,
      loadingMap: { ...state.loadingMap, fetching: true },
      errorMap: { ...state.errorMap, fetching: undefined }
    };
  }

  if (action.type === "PATIENTS_FETCH_SUCCESS") {
    return {
      list: action.payload,
      loadingMap: { ...state.loadingMap, fetching: undefined },
      errorMap: { ...state.errorMap, fetching: undefined }
    };
  }

  if (action.type === "PATIENTS_FETCH_FAIL") {
    return {
      ...state,
      loadingMap: { ...state.loadingMap, fetching: undefined },
      errorMap: { ...state.errorMap, fetching: action.payload }
    };
  }
  return state;
}
