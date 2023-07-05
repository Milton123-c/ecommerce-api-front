
import { useState } from 'react'
import './footer.css'

const Footer = () => {

    const [showFooter, setShowFooter] = useState(false)

    const handleOpen = () => {
        setShowFooter(!showFooter)
    }

  return (
    <footer className={`footer__container ${showFooter && 'footer__closer'}`}>

        <article className='open__footer'>
            <button onClick={handleOpen}>
            <i className='bx bxs-down-arrow-circle'></i>
            </button>
        </article>

        <article className='footer__info'>
            <p>© Academlo 2023</p>
            <p>Milton David Gago Mercado</p>
        </article>

        <article className='footer__button'>
            <button>
            <i className='bx bxl-linkedin-square'></i>
            </button>
            <button>
            <i className='bx bxl-facebook-circle'></i>
            </button>
            <button>
            <i className='bx bxs-parking'></i>
            </button>
        </article>

    </footer>
  )
}

export default Footer