import { useState } from "react"
import axios from "axios"

const UseFetch=url=>{

const [apiInfo, setApiInfo] = useState()
const [error, setError] = useState()

const getProductById=()=>{
    axios.get(url)
    .then(res=>{
        setApiInfo(res.data)
        setError(false)
    })
    .catch(() => setError(true) )
}

return [ apiInfo, getProductById, error ]

}

export default UseFetch 