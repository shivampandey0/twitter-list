import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react';
import { RiFileListLine } from 'react-icons/ri';
import { GrTwitter } from 'react-icons/gr';
import { signOutUser } from '../utils/auth-services';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        pos='sticky'
        top='0'
        px={8}
        zIndex='3'
        bg={useColorModeValue('gray.100', 'gray.900')}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack
            spacing={1}
            alignItems={'center'}
            color='var(--chakra-colors-blue-400)'
            cursor='pointer'
            onClick={() => navigate('/')}
          >
            <GrTwitter size={28} />
            <RiFileListLine size={28} />
            <Heading as='h4' size='md'>
              TwitterList
            </Heading>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={signOutUser}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
