import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import UserIdContext from './contexts/UserIdContext'
import SelectBookshelf from './SelectBookshelf'
import { Card, CardBody, CardFooter, Stack, Text, Image, Heading, SimpleGrid, Badge, AspectRatio } from '@chakra-ui/react'
import styles from './BookCard.module.css'

const BookCard = ({books}) => {

    const navigate = useNavigate()
    const { userId } = useContext(UserIdContext);

    const navigateBook = (bookId) => {
        navigate(`/book/${bookId}`)
    }

    const getBadgeColor = (genre) => {
      switch (genre.toLowerCase()) {
        case 'romance':
          return 'purple';
        case 'fiction':
          return 'blue';
        case 'non-fiction':
          return 'green';
        case 'mystery':
          return 'red';
        case 'fantasy':
          return 'yellow';
        default:
          return 'gray';
      }
    };
    

  return (
    <div>
       <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(16em, 4fr))'>
        {books.map((book, index) => (
          <div key={index}>
            <Card  maxW={['65%', '60%', '70%', '60%']} minW="250px" m="auto" className={styles['card-custom']} >
                <CardBody onClick={() => navigateBook(book.id)} className={styles['card-body']}>
                  <AspectRatio ratio={14/15}>
                    <Image src={book.cover} alt='book cover' objectFit='cover' borderRadius='lg'/>
                  </AspectRatio>
                  <Stack mt='4' spacing='2'>
                    <Heading fontSize='1em' minHeight="2.85em">{book.title}</Heading>
                    <Text minHeight='1em'>{book.author}</Text>
                    <Badge minHeight='1em' colorScheme={getBadgeColor(book.genre)} size='sm' width='fit-content'>{book.genre}</Badge>
                  </Stack>
                </CardBody>
                <CardFooter mt='0' pt='0'>
                  <SelectBookshelf userId={userId} bookId={book.id} book={book}></SelectBookshelf>
                </CardFooter>
              </Card>
           
          </div>
        ))}
        </SimpleGrid>
    </div>
  )
}

export default BookCard