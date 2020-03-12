import React, { useState, useEffect, useRef } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { PatientFormProps } from './container';

export default function PatientForm({
  onFormSubmit,
  loadingMap,
  errorMap,
}: PatientFormProps) {
  const ref = useRef(-1);
  const [showError, setShowError] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (loadingMap.saving) ref.current = 0;
    if (!loadingMap.saving && !errorMap.saving && ref.current === 0) {
      setShowSuccess(true);
    }
  }, [loadingMap.saving, errorMap.saving, setShowSuccess]);

  return (
    <>
      <h4>Patient Form</h4>
      <Form onSubmit={onFormSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="input-email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              name="input-name"
              required
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Phone"
              name="input-phone"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="birthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="text"
              placeholder="Birthday"
              name="input-birthday"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="firstContact">
            <Form.Label>First Contact</Form.Label>
            <Form.Control
              type="text"
              placeholder="From where you heard about me"
              name="input-firstContact"
            />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="1234 Main St" name="input-address" />
        </Form.Group>
        <Form.Group controlId="notes">
          <Form.Label>Notes</Form.Label>
          <textarea
            placeholder="Notes"
            className="form-control"
            name="input-notes"
          />
        </Form.Group>
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
