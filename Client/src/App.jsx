import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Login from './pages/login/Login'
import Home from './pages/Home'

function App() {
  const [user, setuser] = useState(null)


  useEffect(()=>{
    const fetchData = async()=>{
      await axios.get('http://localhost:8080/auth/login/success')
      .then(res=>{
        console.log(res)
      })
      .catch(err=>console.log(err))
    }

    fetchData()
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
