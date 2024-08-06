
import { Link } from 'react-router-dom'
import { HStack, Button, Box } from '@chakra-ui/react';
import { useContext } from 'react';
import UserIdContext from '../contexts/UserIdContext';

const Nav = () => {
  const { userId, setUserId } = useContext(UserIdContext);

  const logout = () => {
    setUserId(null)
  }

  return (
    <nav>
       
      <Box p='4'>
        <HStack spacing={{ base: '1em', sm: '2em', md: '4em', lg: '8em' }}>
          <Link to={'/'}><Button variant='link' colorScheme='brand'>Home</Button></Link>
          
         {!userId ? (
          <>
             <Link to={'/login'}><Button variant='link' colorScheme='brand'>Log in</Button></Link>
             <Link to={'/signup'}><Button variant='link' colorScheme='brand'>Sign up</Button></Link>
          </>
         ) : (
            <>
              <Link to={'/bookshelf'}><Button variant='link' colorScheme='brand'>Bookshelf</Button></Link>
              <Button variant='link' colorScheme='brand' onClick={logout}>Sair</Button>
            </>
         )}
        </HStack>
      </Box>
        
     
    </nav>
  )
}

export default Nav