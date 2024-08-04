import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { db } from '../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore';
import UserIdContext from './contexts/UserIdContext';
import { addBook } from './utils/addBook';
import { useNavigate } from 'react-router-dom';
import SelectBookshelf from './SelectBookshelf';

const BookList = () => {

    const [books, setBooks] = useState([])
    const { userId } = useContext(UserIdContext);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBooks = async () => {
           try{
            const querySnapshot = await getDocs(collection(db, "books"))
            const booksData = []
            querySnapshot.forEach((doc) => {
                const bookData = doc.data()
                bookData.id = doc.id
                booksData.push(bookData)
            })
            setBooks(booksData)
           }catch(e){
            console.log("Error fetching books: " + e)
           }
        }
        fetchBooks()
    }, [])

    
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

export default BookList