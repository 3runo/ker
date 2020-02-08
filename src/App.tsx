import React from "react";
import Container from "react-bootstrap/Container";
import Header from "./views/header";
import PatientList from "./views/patient-list";

export default function App() {
  return (
    <Container>
      <Header />
      <PatientList />
    </Container>
  );
}
