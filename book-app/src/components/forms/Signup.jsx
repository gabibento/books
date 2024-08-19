import { useState, useContext, useEffect } from 'react'
import { db } from '../../firebaseConfig'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import UserIdContext from '../contexts/UserIdContext'
import InputForm from './InputForm'
import ButtonForm from './ButtonForm'
import { Box, Stack, useDisclosure, Button } from '@chakra-ui/react'
import ModalContainer from '../modals/ModalContainer'
import Login from './Login'

const Signup = ({close}) => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const { userId, setUserId } = useContext(UserIdContext);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (userId) {
          console.log("userId has been updated:", userId);
        }
      }, [userId]); //this effect will run whenever userId changes

    const addUser = async () => {
        try{
            //verifies if the email is already being used
           const userQuery = query(collection(db, "users"), where("email", "==", user.email))
           const querySnapshot = await getDocs(userQuery)
           if(querySnapshot.empty){
            //adds user and set the userId context
            const docRef = await addDoc(collection(db, "users"), user)
            console.log("Setting user id: " + docRef.id)
            setUserId(docRef.id)
            return docRef.id
           }else{
            console.log("This email is already being used")
           }
        }catch(e){
            console.error("Error adding user " + e)
        }
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const docId = await addUser()
        console.log("User added with id: " + docId + userId)
        close()
    }


  return (
   
    <form onSubmit={handleOnSubmit}>
        
        <Stack spacing={'2'}>
        <Box p={'2'}>
            <label htmlFor="name">Name</label>
            <InputForm type={'text'} id={'name'} name={'name'} value={user.name} onChange={handleOnChange}></InputForm>
        </Box>
        <Box p={'2'}>
            <label htmlFor="email">Email</label>
            <InputForm type={'email'} id={'email'} name={'email'} value={user.email} onChange={handleOnChange}></InputForm>
        </Box>
        <Box p={'2'}>
            <label htmlFor="password">Password</label>
            <InputForm type={'password'} id={'password'} name={'password'} value={user.password} onChange={handleOnChange}></InputForm>

        </Box>
      
        <ButtonForm text={'Sign up'}></ButtonForm>
        <Box display={"flex"} justifyContent={"center"}>
            <p>Already have an account? <Button onClick={onOpen} colorScheme='brand' variant={'link'}>Log in</Button></p>
        </Box>
        
       </Stack>

       <ModalContainer Component={Login} isOpen={isOpen} onClose={onClose} text={"Log in"}></ModalContainer>
       
    </form>
  )
}

export default Signup