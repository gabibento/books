import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebaseConfig'
import { getDocs, collection, deleteDoc, query, where, doc } from 'firebase/firestore'
import UserIdContext from '../contexts/UserIdContext'

const Bookshelf = () => {
    const [books, setBooks] = useState([])
    const [bookshelf, setBookshelf] = useState('allbooks')
    const { userId } = useContext(UserIdContext)
    const navigate = useNavigate()

    const fetchBooks = async () => {
      if(userId){
        try{
            const querySnapshot = await getDocs(collection(db, "users", userId, "bookshelves", bookshelf, "books"))
            const booksData = []
           querySnapshot.forEach((doc) => {
                const data = doc.data()
                data.docId = doc.id
                console.log(data.docId)
                booksData.push(data)
            })
            setBooks(booksData)
        
        }catch(e){
            console.error("Error fetching books " + e)
        }
      }else{
        console.log("User not defined")
        navigate('/login')
      }
    }

    useEffect(() => {
      fetchBooks()
    }, [bookshelf, userId])

    const defineBookshelf = (e) => {
      setBookshelf(e.target.id)
    }
    const removeBook = async (bookDocId, bookId) => {
      if (userId && bookshelf) {
        const bookshelvesRef = collection(db, "users", userId, "bookshelves")
        await deleteDoc(doc(bookshelvesRef, bookshelf, "books", bookDocId))
        console.log(`Book with ID ${bookDocId} successfully removed!`)

        const tobereadSnapshot = await getDocs(query(collection(bookshelvesRef, "toberead", "books"), where("id", "==", bookId)))
        const readingSnapshot = await getDocs(query(collection(bookshelvesRef, "reading", "books"), where("id", "==", bookId)))
        const readSnapshot = await getDocs(query(collection(bookshelvesRef, "read", "books"), where("id", "==", bookId)))

         //check if the book snapshots are empty, if they are it means the book is not in any shelf, so it removes from the 'allbooks' shelf
        if (tobereadSnapshot.empty && readingSnapshot.empty && readSnapshot.empty) {
          const allbooksSnapshot = await getDocs(query(collection(db, "users", userId, "bookshelves", "allbooks", "books"), where("id", "==", bookId)))
          if (!allbooksSnapshot.empty) {
            allbooksSnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref)
            })
            console.log(`Book with ID ${bookId} successfully removed from 'allbooks'!`)
        }
        }
        fetchBooks()
    } else {
        console.error('User ID or bookshelf not defined')
    }
   }

  return (
    <div>
      <div>
        <ul>
            <li id="allbooks" onClick={defineBookshelf}>All</li>
            <li id="toberead" onClick={defineBookshelf}>To be read</li>
            <li id="reading" onClick={defineBookshelf}>Currently reading</li>
            <li id="read" onClick={defineBookshelf}>Read</li>
        </ul>
      </div>
         <div>
            {books.length === 0 ? (
                <p>No books found</p>
            ) : (
                books.map((book) => (
                    <div key={book.id}>
                        <ul>
                            <li>{book.id}</li>
                            <li>{book.title}</li>
                            <li><img src={book.cover} alt={book.title} /></li>
                        </ul>
                        {bookshelf !== 'allbooks' && <button onClick={() => removeBook(book.docId, book.id)}>Remove</button>}
                    </div>
                ))
            )}
        </div>
    </div>
  )
}

export default Bookshelf