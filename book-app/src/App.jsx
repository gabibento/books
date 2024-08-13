import Home from "./components/pages/Home";
import Signup from "./components/forms/Signup";
import Login from "./components/forms/Login";
import Bookshelf from "./components/pages/Bookshelf";
import Book from "./components/pages/Book";
import GenreList from "./components/GenreList";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NavMenu from "./components/NavMenu";

import { useEffect, useState } from 'react';
import { db } from './firebaseConfig'
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { fetchBooks } from "./components/utils/fetchBooks";

function App() {

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
            booksData.sort((a, b) => (b.popularityCount || 0) - (a.popularityCount || 0));
            
            setBooks(booksData)
            setAllbooks(booksData)
           }catch(e){
            console.log("Error fetching books: " + e)
           }
        }
        fetchBooks()
    }, [])

 
  return (
    <>
    
    <Router>
    <NavMenu books={books} setBooks={setBooks} allbooks={allbooks}></NavMenu>
      <Routes>
        <Route path="/" element={<Home books={books}/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path="/bookshelf" element={<Bookshelf/>}></Route>
        <Route path='book/:id' element={<Book/>}></Route>
        <Route path="/genre/:genre" element={<GenreList/>}></Route>
      </Routes>
    </Router>
     
    </>
  )
}

export default App
