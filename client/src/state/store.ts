import { createStore, combineReducers, applyMiddleware } from 'redux';
import dispatchAsyncAction from './middlewares/async';
// import actionLogger from './middlewares/logger';
import { authReducer } from './auth/';
import { patientsReducer } from './patients/';

const rootReducer = combineReducers({
  auth: authReducer,
  patients: patientsReducer,
});

const appStore = createStore(
  rootReducer,
  undefined,
  applyMiddleware(dispatchAsyncAction)
);

export type RootState = ReturnType<typeof rootReducer>;
export default appStore;
