import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { PatientFormProps } from './container';

export default function PatientForm({
  current: patientData,
  errorMap,
  loadingMap,
  fetchPatient,
  onFormSubmit,
}: PatientFormProps) {
  const ref = useRef(-1);
  const [showError, setShowError] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const { id: patientId } = useParams();

  // load patient data
  useEffect(() => {
    if (patientId) fetchPatient(patientId);
  }, [patientId, fetchPatient]);

  // show success message
  useEffect(() => {
    if (loadingMap.saving) ref.current = 0;
    if (!loadingMap.saving && !errorMap.saving && ref.current === 0) {
      setShowSuccess(true);
    }
  }, [loadingMap.saving, errorMap.saving, setShowSuccess]);

  return (
    <>
      <h4>Patient Form</h4>
      <Form onSubmit={onFormSubmit} name="patient-form">
        <Form.Row>
          <Form.Group as={Col} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="input-email"
              defaultValue={patientId ? patientData?.email : ''}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="input-name"
              defaultValue={patientId ? patientData?.name : ''}
              placeholder="Name"
              required
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="input-phone"
              defaultValue={patientId ? patientData?.phone : ''}
              placeholder="Enter Phone"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="birthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="text"
              name="input-birthday"
              defaultValue={patientId ? patientData?.birthday : ''}
              placeholder="Birthday"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="firstContact">
            <Form.Label>First Contact</Form.Label>
            <Form.Control
              type="text"
              name="input-firstContact"
              defaultValue={patientId ? patientData?.firstContact : ''}
              placeholder="From where you heard about me"
            />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="input-address"
            placeholder="1234 Main St"
            defaultValue={patientId ? patientData?.address : ''}
          />
        </Form.Group>
        <Form.Group controlId="notes">
          <Form.Label>Notes</Form.Label>
          <textarea
            placeholder="Notes"
            className="form-control"
            name="input-notes"
            defaultValue={patientId ? patientData?.notes : ''}
          />
        </Form.Group>
        {typeof patientData !== undefined && (
          <input type="hidden" name="input-id" defaultValue={patientId} />
        )}
        <Button variant="primary" type="submit" disabled={loadingMap.saving}>
          Submit
        </Button>{' '}
        <Button variant="secondary" type="reset" disabled={loadingMap.saving}>
          Reset
        </Button>
        {errorMap.saving && showError && (
          <Alert
            variant="danger"
            onClose={() => setShowError(false)}
            dismissible
            className="mt-3"
          >
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            {errorMap.saving}
          </Alert>
        )}
        {showSuccess && (
          <Alert
            variant="success"
            onClose={() => setShowSuccess(false)}
            dismissible
            className="mt-3"
          >
            <Alert.Heading>Great!</Alert.Heading>
            Patient saved successfully
          </Alert>
        )}
      </Form>
    </>
  );
}
