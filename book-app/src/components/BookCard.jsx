import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import UserIdContext from './contexts/UserIdContext'
import SelectBookshelf from './SelectBookshelf'

const BookCard = ({books}) => {

    const navigate = useNavigate()
    const { userId } = useContext(UserIdContext);

    const navigateBook = (bookId) => {
        navigate(`/book/${bookId}`)
    }

  return (
    <div>
        {books.map((book, index) => (
            <ul key={index}>
                <div onClick={() => navigateBook(book.id)}>
                    <li>{book.id}</li>
                    <li><img src={book.cover} alt="" /></li>
                    <li><strong>{book.title}</strong></li>
                    <li>{book.author}</li>
                    <li>{book.genre}</li>
                </div>
              <SelectBookshelf userId={userId} bookId={book.id} book={book}></SelectBookshelf>
            </ul>   
            
        ))}
    </div>
  )
}

export default BookCard