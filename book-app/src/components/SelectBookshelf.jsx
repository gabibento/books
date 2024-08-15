import React from 'react'
import { addBook } from './utils/addBook';
import { Menu, MenuButton, MenuList, MenuItem, Button, useDisclosure } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import ModalContainer from './modals/ModalContainer';
import Login from './forms/Login';

const SelectBookshelf = ({userId, bookId, book}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()


    const handleBookshelfChange = (bookshelf) => {

        if (bookshelf && book) {
            addBook(userId, bookshelf, bookId, book, onOpen);
        }
    }
  return (
    <>
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme='brand' size='sm'>
        Add to bookshelf
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => handleBookshelfChange('toberead')}>To be read</MenuItem>
        <MenuItem onClick={() => handleBookshelfChange('reading')}>Currently reading</MenuItem>
        <MenuItem onClick={() => handleBookshelfChange('read')}>Read</MenuItem>
      </MenuList>
    </Menu>

    <ModalContainer isOpen={isOpen} onClose={onClose} Component={Login} text={"Login"}></ModalContainer>
    </>
  )
}

export default SelectBookshelf