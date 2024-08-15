
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
  const fontSize = { base: '16px', sm: '16px', md: '16px', lg: '18px' };

  return (
    <nav>
       
        <HStack spacing={{ base: '3.5em', sm: '2em', md: '3em', lg: '5em' }} m={['4', '2', '0', '0']}  sx={{
            display: 'flex',
            justifyContent: ['center', 'flex-end', 'flex-end', 'flex-end']
        }}>
          <Link to={'/'}><Button variant='link' colorScheme='brand' fontSize={fontSize}>Home</Button></Link>
          
         {!userId ? (
          <>
             <Button variant='link' colorScheme='brand' onClick={onLoginOpen} fontSize={fontSize}>Log in</Button>
             <Button variant='link' colorScheme='brand' onClick={onSignupOpen} fontSize={fontSize}>Sign up</Button>
          </>
         ) : (
            <>
              <Link to={'/bookshelf'}><Button variant='link' colorScheme='brand' fontSize={fontSize}>Bookshelf</Button></Link>
              <Button variant='link' colorScheme='brand' onClick={logout} fontSize={fontSize}>Log out</Button>
            </>
         )}
        </HStack>

      <ModalContainer Component={Login} text={'Log in'} isOpen={isLoginOpen} onClose={onLoginClose}></ModalContainer>
      <ModalContainer Component={Signup} text={'Sign up'} isOpen={isSignupOpen} onClose={onSignupClose}></ModalContainer>
 
     
    </nav>
  )
}

export default Nav