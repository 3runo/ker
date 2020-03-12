import React, { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { PatientListProps } from './container';

export default function PatientList({
  deletePatient,
  errorMap,
  fetchPatients,
  list,
  loadingMap,
}: PatientListProps) {
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const onDeleteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.id as string;
    deletePatient(id, fetchPatients);
  };

  if (loadingMap.fetching) {
    return <h6>Loading ...</h6>;
  }

  if (errorMap.fetching) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        {errorMap.fetching}
        <Button variant="primary" onClick={fetchPatients}>
          Reload
        </Button>
      </Alert>
    );
  }

  return (
    <>
      <h4>Patient List</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((patient) => {
            return (
              <tr key={patient.uuid}>
                <td>
                  <div>{patient.name}</div>
                  <small>{patient.email}</small>
                </td>
                <td>{patient.phone}</td>
                <td>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={onDeleteButtonClick}
                    data-id={patient.uuid}
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
