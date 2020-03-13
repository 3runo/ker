import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AuthContainer from './components/auth-container/';
import Header from './views/header/';
import Home from './views/home';
import Login from './views/login';
import PatientForm from './views/patient-form/container';
import PatientList from './views/patient-list/container';
import { RootState } from './state/store';
import { AuthState } from './state/auth/';

function PatientDetail() {
  return <h4>PatientDetail</h4>;
}

function Calendar() {
  return <h4>Calendar</h4>;
}

function App(props: AuthState) {
  const { isAuthenticated } = props;

  return (
    <Router>
      <AuthContainer isAuthenticated={isAuthenticated}>
        <Header {...props} />
        <Route path="/" exact component={Home} />
        <Route path="/login/" component={Login} />
        <Route path="/add-patients/" component={PatientForm} />
        <Route path="/calendar/" component={Calendar} />
        <Route path="/patient/:id/" component={PatientDetail} />
        <Route path="/patients/" component={PatientList} />
      </AuthContainer>
    </Router>
  );
}

const mapStateToProps = (state: RootState) => ({ ...state.auth });
// @ts-ignore
export default connect<AuthState, any, any>(mapStateToProps)(App);
