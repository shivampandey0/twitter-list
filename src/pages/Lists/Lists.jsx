import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  useDisclosure,
} from '@chakra-ui/react';
import { collection, onSnapshot } from 'firebase/firestore';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItem } from '../../components';
import { addList, deleteList, updateList } from '../../utils/db-services';
import { auth, db } from '../../utils/firebase-config';
import { ModalForm } from './ModalForm';
import { SearchBox } from './SearchBox';

export const Lists = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formFields, setFormFields] = useState();
  const [lists, setLists] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [docId, setDocId] = useState();
  const navigate = useNavigate();

  const uid = auth?.currentUser?.uid;

  const onSubmit = (e) => {
    e.preventDefault();
    if (docId) {
      updateList(uid, docId, formFields);
      setDocId();
    } else {
      addList(uid, formFields);
    }
    setFormFields({});
    onClose();
  };

  const updateFormFields = (e) => {
    setFormFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    let unsub = null;
    if (uid) {
      const q = collection(db, 'twitter_lists', uid, 'lists');
      unsub = onSnapshot(q, (qs) => {
        const _lists = qs?.docs?.map((doc) => ({
          id: doc?.id,
          data: doc?.data(),
        }));
        setLists(_lists);
        setFilteredList(_lists);
      });
    }

    return () => {
      unsub && unsub();
    };
  }, [uid]);

  const searchInList = (searchTerm) => {
    if (searchTerm) {
      setFilteredList(() =>
        lists.filter(({ data: { title } }) => title.toLowerCase().includes(searchTerm))
      );
    } else {
      setFilteredList(lists);
    }
  };

  return (
    <Container maxW='full' minH='calc(100vh - 120px)'>
      <ModalForm
        docId={docId}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setDocId();
          setFormFields();
        }}
        onSubmit={onSubmit}
        formFields={formFields}
        updateFormFields={updateFormFields}
      />
      <Flex w='100%' alignItems='center' justifyContent='end'>
        <Box flexGrow={1}>
          <SearchBox onChange={searchInList} />
        </Box>
        <Button onClick={onOpen} colorScheme='blue'>
          Create List
        </Button>
      </Flex>
      {filteredList.length ? (
        <Grid
          templateColumns='repeat(auto-fit,minmax(380px,1fr))'
          gap={8}
          margin='8px'
          justifyContent='center'
        >
          {filteredList.map(({ id, data: { title, description } }) => {
            return (
              <ListItem
                key={id}
                title={title}
                description={description}
                onReadClick={() => navigate(`/list/${id}`)}
                onEdit={() => {
                  setFormFields({ title, description });
                  setDocId(id);
                  onOpen();
                }}
                onDelete={() => {
                  deleteList(uid, id);
                }}
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
