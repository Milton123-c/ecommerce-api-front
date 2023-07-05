import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const productsSlice = createSlice({
    name: 'products',
    initialState: null,
    reducers: {
        setProductsGlobal: (state, action) => action.payload
    }
})

export const { setProductsGlobal } = productsSlice.actions

export default productsSlice.reducer

export const getAllProductsThunk = () => dispatch => {
    const URL_BASE = import.meta.env.VITE_REACT_APP_URL
    const url = `${URL_BASE}/products`
    axios.get(url)
    .then(res => dispatch(setProductsGlobal(res.data)))
    .catch(err => console.log(err))
}