import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ConfirmationModal = ({ isOpen, toggleModal, title, message, onConfirm }) => {
    const handleConfirm = () => {
        onConfirm();
        toggleModal();
    };

    return (
        <Modal isOpen={isOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
            <ModalBody>{message}</ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={handleConfirm}>
                    Confirm
                </Button>{' '}
                <Button color="secondary" onClick={toggleModal}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ConfirmationModal;
