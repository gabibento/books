import BookCard from "./components/BookCard"
import Signup from "./components/forms/Signup";
import Login from "./components/forms/Login";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
 
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<BookCard/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </Router>
     
    </>
  )
}

export default App
