import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { TProps } from "./container";

export default function PatientList({ fetchPatients, list }: TProps) {
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
          </tr>
        </thead>
        <tbody>
          {list.map(patient => {
            return (
              <tr key={patient.uuid}>
                <td>{patient.name}</td>
                <td>{patient.email}</td>
                <td>{patient.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
