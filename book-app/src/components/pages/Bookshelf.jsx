import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebaseConfig'
import { getDocs, collection, deleteDoc, query, where, doc } from 'firebase/firestore'
import UserIdContext from '../contexts/UserIdContext'
import { Tabs, TabList, Tab } from '@chakra-ui/react'
import BookCard from '../BookCard'
import { Heading, Box, Button } from '@chakra-ui/react'

const Bookshelf = () => {
    const [books, setBooks] = useState([])
    const [allbooks, setAllbooks] = useState([])
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
                booksData.push(data)
            })
            setBooks(booksData)
            setAllbooks(booksData)
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
    }, [bookshelf])

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
   const navigateBook = (bookId) => {
    navigate(`/book/${bookId}`)
   }
   const handleTabChange = (index) => {
    const tabs = ['allbooks', 'toberead', 'reading', 'read'];
    setBookshelf(tabs[index]);
  }

  return (
    <div>

      <Box textAlign={"center"} mb={'4'} p={'4'}>
        <Heading as={"h1"} color={"brand.500"} size={'lg'}>Bookshelf</Heading>
      </Box>

      <Tabs isFitted variant='enclosed' onChange={handleTabChange}>
        <TabList mb='1em'>
          <Tab>All</Tab>
          <Tab>To be read</Tab>
          <Tab>Currently reading</Tab>
          <Tab>Read</Tab>
        </TabList>
      </Tabs>

     
      <div>
          {books.length === 0 ? (
          <p>No books found</p>
        ) : (
          
        <div>
          <BookCard books={books} component={"bookshelf"} bookshelf={bookshelf} removeBook={removeBook}></BookCard>
        </div>
          
        )}
      </div>
    </div>
  )
}

export default Bookshelf