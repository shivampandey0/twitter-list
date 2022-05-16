import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
} from '@chakra-ui/react';
export const ModalForm = ({
  docId,
  isOpen,
  onClose,
  onSubmit,
  formFields,
  updateFormFields,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> {docId ? 'Update List' : 'Create List'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack padding='4px' margin='8px'>
            <form onSubmit={onSubmit}>
              <FormControl id='title' isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  name='title'
                  value={formFields?.title ?? ''}
                  onChange={updateFormFields}
                  type='text'
                  required
                  placeholder='Title'
                />
              </FormControl>
              <FormControl id='description'>
                <FormLabel>Description</FormLabel>
                <Textarea
                  type='text'
                  placeholder='Description'
                  name='description'
                  value={formFields?.description ?? ''}
                  onChange={updateFormFields}
                />
              </FormControl>
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button type='submit' colorScheme='green'>
                  {docId ? 'Update' : 'Create'}
                </Button>
              </ModalFooter>
            </form>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
