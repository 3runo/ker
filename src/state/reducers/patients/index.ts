export type PatientsState = {
  list: Array<any>;
  loadingMap: { fetching?: boolean; saving?: boolean };
  errorMap: { fetching?: string; saving?: string };
};

export const initialState: PatientsState = {
  list: [],
  loadingMap: {},
  errorMap: {}
};

export function patientsReducer(
  state: PatientsState = initialState,
  action: any
) {
  return state;
}
