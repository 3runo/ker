import { createStore, combineReducers } from 'redux';
import { authReducer } from './auth/';
import { patientsReducer } from './patients/';

const rootReducer = combineReducers({
  auth: authReducer,
  patients: patientsReducer,
});

const appStore = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export default appStore;
