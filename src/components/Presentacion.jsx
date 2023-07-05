import { useEffect, useState } from "react"
import CardProduct from "./home/CardProduct"

const Presentacion = ({products}) => {

    const [minProduct, setMinProduct] = useState()

    useEffect(()=>{

        if(products){
            const newProduct = products.filter(pro => parseFloat(pro.price) <= 600)
            setMinProduct(newProduct)
        }

    }, [products])
    
  return (
    <section>

        <article>

            

        </article>

    </section>
  )
}

export default Presentacion