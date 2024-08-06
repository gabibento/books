import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { db } from '../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore';
import BookCard from './BookCard';
import Search from './Search';

const BookList = () => {

    const [books, setBooks] = useState([])
    const [allbooks, setAllbooks] = useState([])
  
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
            setAllbooks(booksData)
           }catch(e){
            console.log("Error fetching books: " + e)
           }
        }
        fetchBooks()
    }, [])



    
  return (
    <div>
      <Search books={books} setBooks={setBooks} allbooks={allbooks}></Search>

      <BookCard books={books}></BookCard>
       
    </div>
  )
}

export default BookList