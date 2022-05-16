import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export const ModalAlert = ({ isOpen, onClose, onConfirm }) => {
  const Overlay = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  );

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <Overlay />
        <ModalContent>
          <ModalHeader>Confirm</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this list?</Text>
          </ModalBody>
          <ModalFooter>
            <Button mx={2} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme='red'
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
