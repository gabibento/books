import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebaseConfig'
import { getDocs, collection } from 'firebase/firestore'
import UserIdContext from '../contexts/UserIdContext'

const Bookshelf = () => {
    const [books, setBooks] = useState([])
    const [bookshelf, setBookshelf] = useState('allbooks')
    const { userId } = useContext(UserIdContext)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBooks = async () => {
          if(userId){
            try{
                const querySnapshot = await getDocs(collection(db, "users", userId, "bookshelves", bookshelf, "books"))
                const booksData = []
               querySnapshot.forEach((doc) => {
                    console.log("id " + doc.id)
                    console.log("id " + doc.data().id)
                    const data = doc.data()
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
        fetchBooks()
    }, [bookshelf])

    const defineBookshelf = (e) => {
      setBookshelf(e.target.id)
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
                    </div>
                ))
            )}
        </div>
    </div>
  )
}

export default Bookshelf