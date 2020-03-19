import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { LoginProps } from './container';

export default function Login({
  errorMessage,
  loading,
  onFormSubmit,
}: LoginProps) {
  return (
    <Form onSubmit={onFormSubmit} name="patient-form">
      <Form.Group controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="input-email"
          defaultValue="bruno.adex@gmail.com"
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="input-password"
          placeholder="Password"
          type="password"
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>
        Login
      </Button>
      {errorMessage && (
        <Alert variant="danger" className="mt-3">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          {errorMessage}
        </Alert>
      )}
    </Form>
  );
}
