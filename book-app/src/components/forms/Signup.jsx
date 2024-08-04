import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebaseConfig'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import UserIdContext from '../contexts/UserIdContext'

const Signup = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const { userId, setUserId } = useContext(UserIdContext);
    const navigate = useNavigate()

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
        navigate("/")
    }


  return (
   
    <form onSubmit={handleOnSubmit}>
        
        <label htmlFor="name">Name</label>
        <input type="text"
        id='name'
        name='name'
        onChange={handleOnChange}
        value={user.name}
        required/>

        <label htmlFor="email">Email</label>
        <input type="email"
        name='email'
        id='email' 
        onChange={handleOnChange}
        value={user.email}
        required/>

        <label htmlFor="password">Password</label>
        <input type="password"
        id='password'
        name='password' 
        onChange={handleOnChange}
        value={user.password}
        required/>

        <button type='submit'>Create account</button>
       
    </form>
  )
}

export default Signup