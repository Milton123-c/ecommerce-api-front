import {createSlice} from '@reduxjs/toolkit'


const slice = createSlice({
    name: 'showSearch',
    initialState: false,
    reducers: {
        setShowSearh : (state, action)=> action.payload 
    }
})


export const {setShowSearh} = slice.actions
export default slice.reducer