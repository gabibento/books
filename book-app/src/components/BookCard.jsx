import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import UserIdContext from './contexts/UserIdContext'
import SelectBookshelf from './SelectBookshelf'
import { Card, CardHeader, CardBody, CardFooter, Stack, Divider, Text, Image, Heading, ButtonGroup, Button, SimpleGrid } from '@chakra-ui/react'

const BookCard = ({books}) => {

    const navigate = useNavigate()
    const { userId } = useContext(UserIdContext);

    const navigateBook = (bookId) => {
        navigate(`/book/${bookId}`)
    }

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
              boxShadow: 'lg', 
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
                    <Heading size='md'>{book.title}</Heading>
                    <Text>{book.author}</Text>
                    <Text>{book.genre}</Text>
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