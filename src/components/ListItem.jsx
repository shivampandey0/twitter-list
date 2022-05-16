import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import { FiMoreVertical } from 'react-icons/fi';
import { ModalAlert } from './ModalAlert';

export const ListItem = ({
  title,
  description,
  onReadClick,
  onEdit,
  onDelete,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ModalAlert isOpen={isOpen} onClose={onClose} onConfirm={onDelete} />
      <Center pos='relative'>
        <Stack
          borderWidth='1px'
          borderRadius='lg'
          w={{ md: '540px' }}
          height={{ md: '12rem' }}
          direction={{ base: 'row', md: 'row' }}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          padding={4}
        >
          <Flex flex={1} bg='white'>
            <Image
              objectFit='contain'
              // boxSize='auto'
              src={'/assets/list_placeholder.png'}
            />
          </Flex>
          <Stack
            flex={1}
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            p={1}
            pt={2}
          >
            <Heading fontSize={'2xl'} fontFamily={'body'} noOfLines={1}>
              {title}
            </Heading>

            <Text
              textAlign={'center'}
              noOfLines={2}
              color={useColorModeValue('gray.700', 'gray.400')}
              px={3}
            >
              {description}
            </Text>
            <Stack
              width={'100%'}
              mt={'2rem'}
              direction={'row'}
              padding={2}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Button
                flex={1}
                onClick={onReadClick}
                fontSize={'sm'}
                rounded={'full'}
                _focus={{
                  bg: 'gray.200',
                }}
              >
                Read
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Flex pos='absolute' top={4} right={4} alignItems={'center'}>
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}
            >
              {' '}
              <FiMoreVertical size={20} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onEdit}>Edit</MenuItem>
              <MenuItem onClick={onOpen}>Delete</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Center>
    </>
  );
};
