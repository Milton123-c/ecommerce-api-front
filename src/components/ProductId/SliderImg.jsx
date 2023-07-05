import { useEffect, useState } from 'react'
import '../../styles/sliderImgs.css'

const SliderImg = ({product}) => {

    const [namberImg, setNamberImg] = useState(0)

    
    const cantidad = product?.productImgs.length;

    const [objStyle, setObjStyle] = useState({transform:`translateX(calc(-${namberImg}/3 * 100%))`})

    useEffect(()=> {
        setObjStyle({transform:`translateX(calc(-${namberImg}/${cantidad} * 100%))`})
        
    }, [product, namberImg])

    const handlePreviws = () => {

       
        if(namberImg - 1 < 0){
            setNamberImg(cantidad - 1)
        }else{
            setNamberImg(namberImg - 1)
        }
        
    }

    const handleNext = () => {
        if(namberImg + 1 > 2){
            setNamberImg(0)
        }else{
            setNamberImg(namberImg + 1)
        }

    }

  return (
    <div className='slider'>
        
        <button onClick={handlePreviws} className='slider__arrowhead slider__left'>
        <i className='bx bx-chevrons-left'></i>
        </button>

        <div style={objStyle} className='slider__interior'>

        {
            product?.productImgs.map(imgInfo => (
               <div key={imgInfo.id} className='slider__img-container'>
                 <img className='slider__img'  src={imgInfo.url} alt="" />
            
               </div>
            
                ))
        }
    
        </div>
        <button onClick={handleNext} className='slider__arrowhead slider__right'>
        <i className='bx bx-chevrons-right' ></i>
        </button>
        
    </div>
  )
}

export default SliderImg