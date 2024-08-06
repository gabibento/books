
import { Link } from 'react-router-dom'
import { HStack, Button, Box } from '@chakra-ui/react';

const Nav = () => {

  return (
    <nav>
        <ul>
            <li><Link to={'/bookshelf'}>Bookshelf</Link></li>
            <li><Link to={'/login'}>Log in</Link></li>
            <li><Link to={'/signup'}>Sign up</Link></li>
        </ul>
  
        <Box p='4'>
          <HStack spacing={{ base: '1em', sm: '2em', md: '4em', lg: '8em' }}>
            <Link to={'/'}><Button variant='link' colorScheme='brand'>Home</Button></Link>
            <Link to={'/bookshelf'}><Button variant='link' colorScheme='brand'>Bookshelf</Button></Link>
            <Link to={'/login'}><Button variant='link' colorScheme='brand'>Log in</Button></Link>
            <Link to={'/signup'}><Button variant='link' colorScheme='brand'>Sign up</Button></Link>

          </HStack>
        </Box>
     
    </nav>
  )
}

export default Nav