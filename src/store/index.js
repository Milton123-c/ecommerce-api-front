import { configureStore } from "@reduxjs/toolkit";
import productsGlobal from './slices/products.slice'
import cartGlobal from './slices/cart.slice'
import showCart from './slices/showCart.slice'
import showSearch from './slices/showSearh.slice'

const store = configureStore({
    reducer: {
        productsGlobal,
        cartGlobal,
        showCart,
        showSearch
    }
})

export default store