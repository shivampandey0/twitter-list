import { Box, Input } from '@chakra-ui/react';
import React from 'react';

export const SearchBox = ({ searchTerm, setSearchTerm, searchUser }) => {
  return (
    <Box
      paddingX={3}
      h={12}
      paddingY={2}
      borderBottom='1px solid'
      borderBottomColor='blue.200'
    >
      <Input
        h={8}
        placeholder='Enter Username and press ↵'
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        required
        value={searchTerm}
        backgroundColor='blue.100'
        onKeyDown={(e) => {
          if (e.key === 'Enter') searchUser();
        }}
      />
    </Box>
  );
};
