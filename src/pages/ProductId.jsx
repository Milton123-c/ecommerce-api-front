import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import UseFetch from '../hooks/UseFetch'
import ProductIdInfo from '../components/ProductId/ProductIdInfo'
import SliderImg from '../components/ProductId/SliderImg'
import SimilarProducts from '../components/ProductId/SimilarProducts'
import '../styles/productId.css'
import Loading from '../components/Load/Loading'

const ProductId = () => {
  const { id }=useParams()
  const URL_BASE = import.meta.env.VITE_REACT_APP_URL

  const url = `${URL_BASE}/products/${id}`

  const [ product, getProductByid ] = UseFetch(url)

 

  useEffect(() => {
    getProductByid()
    console.log(product)
  }, [id])
  
  const navigate = useNavigate()
  const handlePreviews = () => {
    navigate('/')
  }

  return (
    <div className='product__id' id='home'>
 
        {
            product? 
            '':
            <div className="containerLoad">
            <div className="load__container">
            <Loading />
            </div>
           
          </div>
        }

        <p className='nave'>
            Home
            <span className='punto'></span>
            <span>{product?.title}</span>
            <button onClick={handlePreviews}><i className='bx bx-arrow-from-right'></i></button>
        </p>
      
        <div className='product__id-container'>
        <SliderImg product={product}/>
     <ProductIdInfo product={product}/>
        </div>
     <SimilarProducts product={product}/>
    </div>
  )
}

export default ProductId