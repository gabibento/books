import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebaseConfig'
import { getDocs, collection, query, where } from 'firebase/firestore'
import BookCard from './BookCard'

const GenreList = () => {
    const { genre } = useParams()
    const [books, setBooks] = useState([])

    const fetchBooks = async () => {
        const querySnapshot = await getDocs(query(collection(db, "books"), where("genre", "==", genre)))
        const booksData = []
        querySnapshot.forEach((doc) => {
            const bookData = doc.data()
                bookData.id = doc.id
                booksData.push(bookData)
        })
        setBooks(booksData)
    }

    useEffect(() => {
        fetchBooks()
    }, [])
  return (
    <div>
        <BookCard books={books}></BookCard>
    </div>
  )
}

export default GenreList