import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import { useEffect } from 'react'
import { getAllProductsThunk } from './store/slices/products.slice'
import { useDispatch } from 'react-redux'

import ProductId from './pages/ProductId'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import { Purchased } from './pages/Purchased'
import Protected from './components/Protected/Protected'
import Header from './shared/Header'



function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllProductsThunk())
  },[])


  return (
    <div>
      <Header/>
      <Routes>

      <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/product/:id' element={<ProductId/>}/>
        <Route path='/cart' element={<Cart />}/>
     
        <Route element={<Protected />}>
             <Route path='/purchased' element={<Purchased />}/>
        </Route>

        
      </Routes>
    </div>
  )
}

export default App
