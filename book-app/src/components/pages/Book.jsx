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

    const cleanDescription = (description) => {
    
        description = description.replace(/<\/p>/g, '\n');
        description = description.replace(/<br\s*\/?>/g, '\n');
        description = description.replace(/<p>/g, '');

        const tempElement = document.createElement("div");
        tempElement.innerHTML = description;
        return tempElement.textContent || tempElement.innerText || "";
    };
    useEffect(() => {
        const fetchBook = async () => {
           try{
            const bookDoc = await getDoc(doc(db, "books", id))
            const data = bookDoc.data()
            data.id = id

            if(bookDoc.exists){

                if (data.description) {
                    data.description = cleanDescription(data.description);
                }
                
                setBook(data)
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
        <img src={book.thumbnail} alt="" />
        <p>{book.authors}</p>
        <p>{book.categories}</p>
        <p>book id: {book.id}</p>
        <SelectBookshelf userId={userId} bookId={book.id} book={book}></SelectBookshelf>
        <pre>{book.description}</pre>

    </div>
  )
}

export default Book