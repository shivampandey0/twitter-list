import {
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
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
  useDisclosure,
} from '@chakra-ui/react';
import { collection, onSnapshot } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItem } from '../components';
import { addDataToFirestore } from '../utils/db-services';
import { auth, db } from '../utils/firebase-config';

const ListForm = ({
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
        <ModalHeader>Create List</ModalHeader>
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
                  Create
                </Button>
              </ModalFooter>
            </form>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const Lists = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formFields, setFormFields] = useState();
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  const uid = auth?.currentUser?.uid;

  const onSubmit = (e) => {
    e.preventDefault();
    addDataToFirestore(uid, formFields);
    setFormFields({});
    onClose();
  };

  const updateFormFields = (e) => {
    setFormFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (uid) {
    const q = collection(db, 'twitter_lists', uid, 'lists');
    onSnapshot(q, (qs) => {
      setLists(qs?.docs?.map((doc) => ({ id: doc?.id, data: doc?.data() })));
    });
  }

  return (
    <Container maxW='full' h='calc(100vh - 120px)'>
      <ListForm
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        formFields={formFields}
        updateFormFields={updateFormFields}
      />
      <Flex w='100%' justifyContent='end'>
        <Button onClick={onOpen} mt={4} colorScheme='blue'>
          Create List
        </Button>
      </Flex>
      {lists.length ? (
        <Grid
          templateColumns='repeat(auto-fit,minmax(380px,1fr))'
          gap={8}
          margin='8px'
          justifyContent='center'
        >
          {lists.map(({ id, data: { title, description } }) => {
            return (
              <ListItem
                key={id}
                title={title}
                description={description}
                onReadClick={() => navigate(`/lists/${id}`)}
              />
            );
          })}
        </Grid>
      ) : (
        <Center>
          <h3>No lists found!</h3>
        </Center>
      )}
    </Container>
  );
};
