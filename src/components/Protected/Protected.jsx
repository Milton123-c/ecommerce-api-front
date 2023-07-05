import React from 'react'
import {Outlet, useNavigate} from 'react-router-dom'

const Protected = () => {

    const datos = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate()

    const handleSign = () =>{
        navigate('/login')
    }
  
    if(datos){
        return <Outlet />
    }else{
        return (
            <article className='no__register'>
                <article>
                    <p>Sorry!!</p>
                    <p>Don't have an account?</p>
                    <button onClick={handleSign}>
                        Sign in
                    </button>
                </article>
            </article>
        )
    }

}

export default Protected