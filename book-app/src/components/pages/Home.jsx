import React from 'react'
import Nav from './Nav'
import BookCard from '../BookCard'
import { useNavigate } from 'react-router-dom'

const Home = ({books}) => {
  const navigate = useNavigate()

  const navigateGenre = (e) => {
    const genre = e.target.id
    navigate(`/genre/${genre}`)
  }
  return (
    <div>

        <ul>
          <li id='romance' onClick={navigateGenre}>Romance</li>
          <li id='fantasy' onClick={navigateGenre}>Fantasy</li>
        </ul>
        <BookCard books={books}></BookCard>
    </div>
  )
}

export default Home