import { useState, useContext, useEffect } from 'react'
import { db } from '../../firebaseConfig'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import UserIdContext from '../contexts/UserIdContext'
import InputForm from './InputForm'
import ButtonForm from './ButtonForm'
import { Box, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Signup = ({onClose}) => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const { userId, setUserId } = useContext(UserIdContext);

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
        onClose()
    }


  return (
   
    <form onSubmit={handleOnSubmit}>
        
        <Stack spacing={'2'}>
        <Box p={'2'}>
            <label htmlFor="name">Name</label>
            <InputForm type={'text'} id={'name'} value={user.name} onChange={handleOnChange}></InputForm>
        </Box>
        <Box p={'2'}>
            <label htmlFor="email">Email</label>
            <InputForm type={'email'} id={'email'} value={user.email} onChange={handleOnChange}></InputForm>
        </Box>
        <Box p={'2'}>
            <label htmlFor="password">Password</label>
            <InputForm type={'password'} id={'password'} value={user.password} onChange={handleOnChange}></InputForm>

        </Box>
      
        <ButtonForm text={'Sign up'}></ButtonForm>
        <Box display={"flex"} justifyContent={"center"}>
            <p>Don't have an account? <Link to={'/signup'}>Sign up</Link></p>
        </Box>
        
       </Stack>
       
    </form>
  )
}

export default Signup