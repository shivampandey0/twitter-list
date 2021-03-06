import { Box, Center, Container, Skeleton } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase-config';
import { addUserInList, deleteUserInList } from '../../utils/db-services';
import { Navbar, SearchBox, SingleUser, TweetsNavbar } from '../../components';
import { Tweets } from './Tweets';
import { openProfile } from '../../utils/utils';

export const SingleList = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [twitterUsers, setTwitterUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [loading, setLoading] = useState(false);

  const uid = auth?.currentUser?.uid;

  useEffect(() => {
    let unsub = null;
    if (uid && id) {
      const q = collection(
        db,
        'twitter_lists',
        uid,
        'lists',
        id,
        'twitter_users'
      );
      unsub = onSnapshot(q, (qs) => {
        setTwitterUsers(
          qs?.docs?.map((doc) => ({ id: doc?.id, data: doc?.data() }))
        );
      });
    }

    return () => {
      unsub && unsub();
    };
  }, [id, uid]);

  const searchUser = async () => {
    const user = doesExist(searchTerm);
    if (user) {
      setSelectedUser({ ...user.data, docId: user.id });
      alert('user already exists!');
    } else {
      try {
        setLoading(true);
        const res = await fetch(`/api/getUser?username=${searchTerm}`);
        if (res.status === 200) {
          const data = await res.json();
          addUserInList(uid, id, data);
          setSearchTerm('');
        } else {
          alert(`Couldn't find user, Please check username.`);
        }
      } catch (error) {
        alert(`Couldn't find user, Please check username.`);
      } finally {
        setLoading(false);
      }
    }
  };

  const doesExist = (username) => {
    const exists = twitterUsers.find(
      (user) => user.data.username.toLowerCase() === username
    );
    return exists;
  };

  return (
    <Container maxW='full' minH='100vh' display='flex' padding='0'>
      {/* Users Section */}
      <Box
        minW={{ base: selectedUser ? '0' : '100%', md: '380px' }}
        w={{ base: selectedUser ? '0' : '100%', md: '30%' }}
        overflowY='auto'
        height='100vh'
        paddingBottom={16}
        borderRight='1px solid'
        borderRightColor='blue.200'
      >
        <Navbar />
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchUser={searchUser}
        />

        {twitterUsers.length ? (
          twitterUsers.map(({ id, data }) => {
            return (
              <SingleUser
                key={data.id}
                bg={selectedUser === data.id && 'blue.200'}
                username={data.username}
                name={data.name}
                profile_image_url={data.profile_image_url}
                onClick={() => setSelectedUser({ docId: id, ...data })}
              />
            );
          })
        ) : (
          <Center my='50%' mx='10%' >Add Twitter Users by Twitter username above.</Center>
        )}
        {loading && <Skeleton h='8vh' />}
      </Box>
      {/* Tweets Section */}
      <Box
        w={{ base: selectedUser ? '100%' : '0', md: '70%' }}
        overflowY={selectedUser && 'auto'}
        height='100vh'
        paddingBottom={16}
      >
        {!selectedUser && (
          <Center display={{ base: 'none', md: 'flex' }} h='inherit'>
            Select a user to see their tweets
          </Center>
        )}

        {selectedUser && (
          <TweetsNavbar
            user={{ ...selectedUser }}
            onProfile={() => openProfile(selectedUser.username)}
            onDelete={() => {
              deleteUserInList(uid, id, selectedUser.docId);
              setSelectedUser();
            }}
            onBack={() => setSelectedUser()}
          />
        )}
        {selectedUser && <Tweets {...selectedUser} />}
      </Box>
    </Container>
  );
};
