import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { TProps } from "./container";

export default function PatientList({
  deletePatient,
  fetchPatients,
  list
}: TProps) {
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return (
    <>
      <h4>Patient List</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map(patient => {
            return (
              <tr key={patient.uuid}>
                <td>{patient.name}</td>
                <td>{patient.email}</td>
                <td>{patient.phone}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => {
                      deletePatient(patient.uuid);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
