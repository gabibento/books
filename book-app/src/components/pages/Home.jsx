import React from 'react'
import Nav from './Nav'
import BookList from '../BookList'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const navigateGenre = (e) => {
    const genre = e.target.id
    navigate(`/genre/${genre}`)
  }
  return (
    <div>
        <Nav></Nav>
        <ul>
          <li id='romance' onClick={navigateGenre}>Romance</li>
          <li id='fantasy' onClick={navigateGenre}>Fantasy</li>
        </ul>
        <BookList></BookList>
    </div>
  )
}

export default Home