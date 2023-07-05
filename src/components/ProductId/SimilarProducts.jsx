import React, { useEffect } from 'react'
import UseFetch from '../../hooks/UseFetch';
import CardProduct from '../home/CardProduct';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsCartThunk } from '../../store/slices/cart.slice';

const SimilarProducts = ({product}) => {
    
    const URL_BASE = import.meta.env.VITE_REACT_APP_URL
    const url = `${URL_BASE}/products?categoryId=${product?.categoryId}`
    const [ filterProducts, getProductByCategory ] = UseFetch(url)

    const {cartGlobal} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        if(product ){
         getProductByCategory()
        }
    }, [product])

    useEffect(()=>{
        dispatch(getAllProductsCartThunk())
    }, [])

  return (
    <section className='similar__product'>
        <h2>discover similar products</h2>
        <div className='similar__container'>
             {
                filterProducts?.map(prod=>{
                    if(prod.id!== product.id){
                        return  <CardProduct 
                        key={prod.id}
                        product={prod}
                        cartGlobal={cartGlobal}
                        />                                                   
                    }
                })
            }
        </div>
    </section>
  )
}

export default SimilarProducts