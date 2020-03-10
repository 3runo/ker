import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { TProps } from "./container";

export default function PatientForm({ onFormSubmit }: TProps) {
  return (
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

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
