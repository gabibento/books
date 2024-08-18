import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import UserIdContext from './contexts/UserIdContext'
import SelectBookshelf from './SelectBookshelf'
import { Card, CardBody, CardFooter, Stack, Text, Image, Heading, SimpleGrid, Badge, AspectRatio, Box, Button } from '@chakra-ui/react'
import styles from './BookCard.module.css'

const BookCard = ({books, component, bookshelf, removeBook}) => {

    const navigate = useNavigate()
    const { userId } = useContext(UserIdContext);

    const navigateBook = (bookId) => {
        navigate(`/book/${bookId}`)
    }

    const getBadgeColor = (genre) => {
      if(genre){
        switch (genre.toLowerCase()) {
          case 'romance' || 'poetry':
            return 'pink';
          case 'science fiction' || 'science':
            return 'blue';
          case 'thriller' || 'horror':
            return 'gray';
          case 'mystery':
            return 'red';
          case 'fantasy' || 'adventure':
            return '#B19CD9';
          case 'biography':
            return 'brown';
          case 'history':
            return 'green';
          case 'drama':
            return 'yellow'
          default:
            return 'gray';
        }
      }
    }
    

  return (
    <div>
       <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(16em, 4fr))'>
        {books.map((book, index) => (
          <div key={index}>
            <Card maxW={['65%', '60%', '70%', '60%']} minW="250px" m="auto" className={styles['card-custom']} >
                <CardBody onClick={() => navigateBook(book.id)} className={styles['card-body']}>
                  <AspectRatio ratio={4/5}>
                    <Image src={book.thumbnail} alt='book cover' borderRadius='lg'/>
                  </AspectRatio>
                  <Stack mt='4' spacing='2'>
                    <Heading fontSize='1em' minHeight="2.85em">{book.title}</Heading>
                    <Text minHeight='1em'>{book.authors}</Text>
                    <Badge minHeight='1em' size='sm' width='fit-content' bgColor={getBadgeColor(book.category)}>{book.category}</Badge>
                  </Stack>
                </CardBody>
                <CardFooter mt='0' pt='0'>
                  {component == "bookshelf" ? ( 
                       bookshelf !== 'allbooks' && <Button onClick={() => removeBook(book.docId, book.id)} colorScheme='brand'>Remove</Button>
                    ) : (
                      <SelectBookshelf userId={userId} bookId={book.id} book={book}></SelectBookshelf>
                    )}
                 
                </CardFooter>
              </Card>
           
          </div>
        ))}
        </SimpleGrid>
    </div>
  )
}

export default BookCard