import { Avatar, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

export const SingleUser = ({
  bg,
  onClick,
  username,
  profile_image_url,
  name,
}) => {
  return (
    <HStack
      alignItems='center'
      gap={4}
      padding={2}
      cursor='pointer'
      borderBottom='1px solid'
      borderBottomColor='blue.200'
      backgroundColor={bg}
      _hover={{
        bg: 'blue.200',
      }}
      onClick={onClick}
    >
      <Avatar name={username} src={profile_image_url} />
      <VStack alignItems='start'>
        <Heading as='h4' size='sm'>
          {name}
        </Heading>
        <Text as='i'>Tap to see recent tweets</Text>
      </VStack>
    </HStack>
  );
};
