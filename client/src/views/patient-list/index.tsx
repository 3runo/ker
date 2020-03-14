import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((patient) => {
            return (
              <tr key={patient.uuid}>
                <td>
                  <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <strong style={{ fontWeight: 600 }}>{patient.name}</strong>
                    <small className="font-weight-light">{patient.email}</small>
                  </div>
                </td>
                <td>
                  <span className="text-muted font-weight-light">
                    {patient.phone}
                  </span>
                </td>
                <td>-</td>
                <td>
                  <Link
                    to={`/patient-form/${patient.uuid}`}
                    className="btn btn-link btn-sm"
                    role="button"
                  >
                    Edit
                  </Link>
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
