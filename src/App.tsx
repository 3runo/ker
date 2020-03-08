import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./views/header";
import Home from "./views/home";
import PatientForm from "./views/patient-form";
import PatientList from "./views/patient-list/container";

function PatientDetail() {
  return <h4>PatientDetail</h4>;
}

function Calendar() {
  return <h4>Calendar</h4>;
}

export default function App() {
  return (
    <Router>
      <Container>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/add-patients/" component={PatientForm} />
        <Route path="/calendar/" component={Calendar} />
        <Route path="/patient/:id" component={PatientDetail} />
        <Route path="/patients/" component={PatientList} />
      </Container>
    </Router>
  );
}
