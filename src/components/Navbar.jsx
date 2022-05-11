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
  MenuDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiFileListLine } from "react-icons/ri";
import { GrTwitter } from "react-icons/gr";
import { signOutUser } from "../utils/auth-services";

export const Navbar = () => {
  const signOut = async () => {
    await signOutUser();
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={16}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={1} alignItems={"center"}>
            <GrTwitter w={60} h={60} color="blue.500" />
            <RiFileListLine />
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
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
