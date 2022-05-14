import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  MenuButton,
  Heading,
} from '@chakra-ui/react';
import { IoIosArrowBack, IoIosSettings, IoIosTrash } from 'react-icons/io';
import { FiExternalLink } from 'react-icons/fi';
import { signOutUser } from '../utils/auth-services';

export const TweetsNavbar = ({ user, onBack, onProfile, onDelete }) => {
  const signOut = async () => {
    await signOutUser();
  };

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Button
            as={Button}
            rounded={'full'}
            variant={'link'}
            onClick={onBack}
            cursor={'pointer'}
            minW={0}
          >
            <IoIosArrowBack size={32} color='grey' />
            <Avatar size={'sm'} src={user.profile_image_url} />
            <Heading ml={4} as='h4' size='md' color='black'>
              {user.name}
            </Heading>
          </Button>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <IoIosSettings size={28} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onProfile}>
                  Open User profile <FiExternalLink size={16} />{' '}
                </MenuItem>
                <MenuItem onClick={onDelete}>
                  Delete User <IoIosTrash size={16} color='red' />{' '}
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={signOut}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
