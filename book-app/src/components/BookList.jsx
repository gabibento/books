import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { db } from '../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore';
import UserIdContext from './contexts/UserIdContext';
import { addBook } from './utils/addBook';
import { useNavigate } from 'react-router-dom';

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

    const handleBookshelfChange = (event, book) => {
        const selectedBookshelf = event.target.value;

        if (selectedBookshelf && book) {
            addBook(userId, selectedBookshelf, book.id, book, navigate);
        }
    };

  return (
    <div>

        {books.map((book, index) => (
            <ul key={index}>
                <li>{book.id}</li>
                <li><img src={book.cover} alt="" /></li>
                <li><strong>{book.title}</strong></li>
                <li>{book.author}</li>
                <li>{book.genre}</li>

                <select name="bookshelf" onChange={(event) => handleBookshelfChange(event, book)}>
                    <option value="">Add to bookshelf</option>
                    <option value="toberead">To be read</option>
                    <option value="reading">Currently reading</option>
                    <option value="read">Read</option>
                </select>
            </ul>   
            
        ))}
       
    </div>
  )
}

export default BookList