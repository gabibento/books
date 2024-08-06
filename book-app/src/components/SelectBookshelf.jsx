import React from 'react'
import { useNavigate } from 'react-router-dom';
import { addBook } from './utils/addBook';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,

} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

const SelectBookshelf = ({userId, bookId, book}) => {

    const navigate = useNavigate()

    const handleBookshelfChange = (bookshelf) => {

        if (bookshelf && book) {
            addBook(userId, bookshelf, bookId, book, navigate);
        }
    }
  return (
    <>
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme='brand'>
        Add to bookshelf
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => handleBookshelfChange('toberead')}>To be read</MenuItem>
        <MenuItem onClick={() => handleBookshelfChange('reading')}>Currently reading</MenuItem>
        <MenuItem onClick={() => handleBookshelfChange('read')}>Read</MenuItem>
      </MenuList>
    </Menu>
    </>
  )
}

export default SelectBookshelf