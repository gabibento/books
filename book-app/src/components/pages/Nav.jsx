
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import UserIdContext from '../contexts/UserIdContext';
import { HStack, Box, Button, useDisclosure } from '@chakra-ui/react';
import Login from '../forms/Login'
import ModalContainer from '../modals/ModalContainer';
import Signup from '../forms/Signup'

const Nav = () => {
  const { userId, setUserId } = useContext(UserIdContext);
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen: isSignupOpen, onOpen: onSignupOpen, onClose: onSignupClose } = useDisclosure();

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
             <Button variant='link' colorScheme='brand' onClick={onLoginOpen}>Log in</Button>
             <Button variant='link' colorScheme='brand' onClick={onSignupOpen}>Sign up</Button>
          </>
         ) : (
            <>
              <Link to={'/bookshelf'}><Button variant='link' colorScheme='brand'>Bookshelf</Button></Link>
              <Button variant='link' colorScheme='brand' onClick={logout}>Log out</Button>
            </>
         )}
        </HStack>
      </Box>

      <ModalContainer Component={Login} text={'Log in'} isOpen={isLoginOpen} onClose={onLoginClose}></ModalContainer>
      <ModalContainer Component={Signup} text={'Sign up'} isOpen={isSignupOpen} onClose={onSignupClose}></ModalContainer>
 
     
    </nav>
  )
}

export default Nav