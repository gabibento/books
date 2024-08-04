import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>
        <ul>
            <li><Link to={'/bookshelf'}>Bookshelf</Link></li>
            <li><Link to={'/login'}>Log in</Link></li>
            <li><Link to={'/signup'}>Sign up</Link></li>
        </ul>
    </nav>
  )
}

export default Nav