import Home from "./components/pages/Home";
import Signup from "./components/forms/Signup";
import Login from "./components/forms/Login";
import Bookshelf from "./components/pages/Bookshelf";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
 
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path="/bookshelf" element={<Bookshelf/>}></Route>
      </Routes>
    </Router>
     
    </>
  )
}

export default App
