import { createSlice } from "@reduxjs/toolkit";


const slice = createSlice({
    name:'showCart',
    initialState : false,
    reducers: {
        setShowCart : (state, action)=> action.payload 
    }
})

export const {setShowCart} = slice.actions

export default slice.reducer