import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export type ConfirmModalProps = {
  isOpen: boolean;
  msg: string;
  onConfirm?: (e: React.MouseEvent<HTMLButtonElement>) => any;
  onHide: () => void;
};

export default function ConfirmModal(props: ConfirmModalProps) {
  return (
    <Modal
      size="sm"
      show={props.isOpen}
      onHide={props.onHide}
      aria-labelledby="confirm-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="confirm-modal">Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.msg}</p>
        <Button
          className="float-right"
          onClick={props.onConfirm}
          size="sm"
          variant="danger"
        >
          Confirm
        </Button>
      </Modal.Body>
    </Modal>
  );
}
