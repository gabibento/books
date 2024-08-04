import React from 'react'
import { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore';

const BookCard = () => {

    const [books, setBooks] = useState([])

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

  return (
    <div>
        {books.map((book, index) => (
            <ul key={index}>
                <li>{book.id}</li>
                <li><img src={book.cover} alt="" /></li>
                <li><strong>{book.title}</strong></li>
                <li>{book.author}</li>
                <li>{book.genre}</li>
            </ul>   
        ))}
       
    </div>
  )
}

export default BookCard