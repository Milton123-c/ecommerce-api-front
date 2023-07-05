const getConfiToken = ()=>({
    headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
    }
})
export default getConfiToken