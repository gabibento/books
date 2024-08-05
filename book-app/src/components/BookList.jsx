import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { db } from '../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore';
import BookCard from './BookCard';

const BookList = () => {

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

      <BookCard books={books}></BookCard>
       
    </div>
  )
}

export default BookList