import React from 'react'
import BookCard from '../BookCard'
import { useNavigate } from 'react-router-dom'
import { Heading, Box } from '@chakra-ui/react'

const Home = ({books}) => {
  const navigate = useNavigate()

  const navigateGenre = (e) => {
    const genre = e.target.id
    navigate(`/genre/${genre}`)
  }
  return (
    <div>
      <Box pl={[ '2', '3', '6', '7']} mb={'4'}>
        <Heading as={"h1"} color={"brand.500"} size={'lg'}>Books for you</Heading>
      </Box>
      <BookCard books={books}></BookCard>
      
    </div>
  )
}

export default Home