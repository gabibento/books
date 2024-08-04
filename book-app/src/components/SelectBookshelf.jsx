import React from 'react'
import { useNavigate } from 'react-router-dom';
import { addBook } from './utils/addBook';

const SelectBookshelf = ({userId, bookId, book}) => {

    const navigate = useNavigate()

    const handleBookshelfChange = (event, book) => {
        const selectedBookshelf = event.target.value;

        if (selectedBookshelf && book) {
            addBook(userId, selectedBookshelf, bookId, book, navigate);
        }
    }
  return (
    <select name="bookshelf" onChange={(event) => handleBookshelfChange(event, book)}>
        <option value="">Add to bookshelf</option>
        <option value="toberead">To be read</option>
        <option value="reading">Currently reading</option>
        <option value="read">Read</option>
    </select>
  )
}

export default SelectBookshelf