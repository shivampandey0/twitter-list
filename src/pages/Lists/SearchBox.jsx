import { Box, Input } from '@chakra-ui/react';

export const SearchBox = ({ onChange }) => {
  return (
    <Box paddingX={3} paddingY={2}>
      <Input
        placeholder='Search Lists by name...'
        onChange={(e) => onChange(e.target.value.toLowerCase())}
        required
        backgroundColor='blue.100'
      />
    </Box>
  );
};
