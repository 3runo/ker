import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AuthContainer from './components/auth-container/';
import Header from './views/header/';
import Home from './views/home';
import Login from './views/login/container';
import PatientForm from './views/patient-form/container';
import PatientList from './views/patient-list/container';
import { RootState } from './state/store';
import { AuthState } from './state/auth/';
import { getValidateToken } from './state/auth/api/';
import { authAction } from './state/auth/';

type StateProps = AuthState;
type OwnProps = { history: any };
type DispatchProps = { validateToken: (e: string) => void };
type AppProps = StateProps & DispatchProps;

const PatientDetail = () => <h4>PatientDetail</h4>;
const Calendar = () => <h4>Calendar</h4>;
function App(props: AppProps) {
  const { isAuthenticated, validateToken } = props;

  useEffect(() => {
    const token = window.localStorage.getItem('ker_token');
    if (token && !isAuthenticated) validateToken(token);
  }, [isAuthenticated, validateToken]);

  return (
    <Router>
      <AuthContainer isAuthenticated={isAuthenticated}>
        <Header {...props} />
        <Route path="/" exact component={Home} />
        <Route path="/login/" component={Login} />
        <Route path="/patient-form/:id?" component={PatientForm} />
        <Route path="/calendar/" component={Calendar} />
        <Route path="/patient/:id/" component={PatientDetail} />
        <Route path="/patients/" component={PatientList} />
      </AuthContainer>
    </Router>
  );
}

const mapStateToProps = (state: RootState) => ({ ...state.auth });
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  validateToken: function validateToken(token: string) {
    dispatch(
      authAction(
        getValidateToken(token).catch((err) => {
          window.localStorage.removeItem('ker_token');
          return Promise.reject(err); // keeping promise chain
        })
      )
    );
  },
});

export default connect<StateProps, DispatchProps, OwnProps>(
  // @ts-ignore
  mapStateToProps,
  mapDispatchToProps
)(App);
