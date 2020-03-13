import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ConfirmModal from '../../components/confirm-modal';
import { PatientListProps } from './container';

const confirmModalState = {
  isOpen: false,
  msg: '',
  onConfirm: () => {},
};

export default function PatientList({
  deletePatient,
  errorMap,
  fetchPatients,
  list,
  loadingMap,
}: PatientListProps) {
  const [confirmModal, setConfirmModal] = useState(confirmModalState);

  const toggleConfirmModal = () => setConfirmModal({ ...confirmModalState });

  const onDeleteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.id as string;
    const name = e.currentTarget.dataset.name as string;
    setConfirmModal({
      isOpen: true,
      msg: `Do you want to remove ${name}?`,
      onConfirm: () => deletePatient(id, fetchPatients),
    });
  };

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  useEffect(() => {
    if (loadingMap.removing) setConfirmModal({ ...confirmModalState });
  }, [loadingMap.removing, setConfirmModal]);

  if (loadingMap.fetching) return <h6>Loading ...</h6>;

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
                    disabled={loadingMap.removing}
                    data-id={patient.uuid}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-danger"
                    onClick={onDeleteButtonClick}
                    disabled={loadingMap.removing}
                    data-id={patient.uuid}
                    data-name={patient.name}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ConfirmModal onHide={toggleConfirmModal} {...confirmModal} />
    </>
  );
}
