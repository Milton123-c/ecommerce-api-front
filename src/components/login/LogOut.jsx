import { useState } from "react"
import Loading from "../Load/Loading"


const LogOut = ({setUserN}) => {

    const [name, setName] = useState(JSON.parse(localStorage.getItem('user')))
    
    const handleLogut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserN()
    }    

  return (
    <article className="log__out">

        <article>
        <i className='bx bx-user-pin' ></i>
        <p>{name?.user.firstName}</p>
        <button onClick={handleLogut}>
            Log out
        </button>
        </article>
    </article>
  )
}

export default LogOut