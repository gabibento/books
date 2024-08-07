import React from 'react'
import { useState, useContext, useEffect } from 'react';
import UserIdContext from '../contexts/UserIdContext';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Login = ({onClose}) => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const { userId, setUserId } = useContext(UserIdContext);

    useEffect(() => {
        if (userId) {
          console.log("userId has been updated:", userId);
        }
      }, [userId]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault()

        try{
            const userQuery = query(
            collection(db, "users"), 
            where("email", "==", user.email), 
            where("password", "==", user.password))

            const querySnapshot = await getDocs(userQuery)

            if(!querySnapshot.empty){
                querySnapshot.forEach((doc) => {
                    const docId = doc.id
                    setUserId(docId)
                    console.log(docId)
                })
                console.log("User logged with id: " + userId)
                onClose()
            }else{
                console.log("Invalid email or password")
            }
        }catch(e){
            console.error("Query error " + e)
        }

    }

  return (
    <form onSubmit={handleOnSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" 
        id='email'
        name='email'
        value={user.email}
        onChange={handleOnChange}
        />

        <label htmlFor="password">Password</label>
        <input type="password"
        id='password'
        name='password'
        value={user.password}
        onChange={handleOnChange} />

        <button type='submit'>Log in</button>
        <p>Don't have an account? <Link to={'/signup'}>Sign up</Link></p>
    </form>
  )
}

export default Login