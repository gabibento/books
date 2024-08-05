import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import UserIdContext from './contexts/UserIdContext'
import SelectBookshelf from './SelectBookshelf'
import { Card, CardBody, CardFooter, Stack, Text, Image, Heading, SimpleGrid, Badge } from '@chakra-ui/react'

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
          
            <Card maxW='sm' 
            height="100%"
            borderWidth='1px' 
            borderColor='gray.100' 
            borderStyle='solid'
            _hover={{ 
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', 
              borderColor: 'gray.200', 
              transition: 'all 0.3s ease-in-out',
              cursor: 'pointer'
            }}>
                <CardBody onClick={() => navigateBook(book.id)}>
                  <Image
                    src={book.cover}
                    alt='book cover'
                    borderRadius='lg'
                    boxSize="20em" 
                    objectFit="cover" 
                    alignSelf="center"
                  />
                  <Stack mt='6' spacing='2'>
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