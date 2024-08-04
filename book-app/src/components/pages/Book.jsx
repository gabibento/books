import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebaseConfig'
import { getDoc, doc } from 'firebase/firestore'
import SelectBookshelf from '../SelectBookshelf'
import UserIdContext from '../contexts/UserIdContext'

const Book = () => {
    const { id } = useParams()
    const [book, setBook] = useState(null)
    const { userId } = useContext(UserIdContext);

    useEffect(() => {
        const fetchBook = async () => {
           try{
            const bookDoc = await getDoc(doc(db, "books", id))

            if(bookDoc.exists){
                setBook(bookDoc.data())
            }else{
                console.log('Book does not exist');
            }
           }catch(e){
            console.error("Error fetching book " + e)
           }
        }
        fetchBook()
    }, [id])
    if (!book) {
        return <div>Loading book...</div>
    }

  return (
    <div>
        <h2>{book.title}</h2>
        <img src={book.cover} alt="" />
        <p>{book.author}</p>
        <p>{book.genre}</p>
        <SelectBookshelf userId={userId} bookId={id} book={book}></SelectBookshelf>
        <a href={book.link}>Buy now</a>
        <p>{book.synopsis}</p>

    </div>
  )
}

export default Book