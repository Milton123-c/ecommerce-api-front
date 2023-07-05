import axios from "axios";
import getConfiToken from "../utils/getConfiToken";
import { getAllProductsCartThunk } from "../store/slices/cart.slice";
import { useDispatch } from "react-redux";
import { useState } from "react";


const usePurchases = () => {

    const URL_BASE = import.meta.env.VITE_REACT_APP_URL

    const dispatch = useDispatch()
    const url = `${URL_BASE}/purchase`
    
    const [purchases, setPurchases] = useState()

    const [errorBuy, setErrorBuy] = useState()
    
    const buyThisCart = () =>{

        
        axios.post(url,{}, getConfiToken())
        .then( ()=> {
            setErrorBuy(false)
            dispatch(getAllProductsCartThunk())
           
        })
        .catch(()=>  setErrorBuy(true))
    }

    const getAllProductPurchased = () => {
        
        axios.get(url, getConfiToken())
        .then(res => setPurchases(res.data))
        .catch(error => console.log(error))
    }

    return {buyThisCart, getAllProductPurchased, purchases, errorBuy}
}

export default usePurchases;