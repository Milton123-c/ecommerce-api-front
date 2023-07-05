import axios from "axios";
import React, { useEffect, useState } from "react";

export const ProductPurchase = ({ prodPuchase }) => {
  const fecha = new Date(prodPuchase.createdAt);

  const [setImage, setSetImage] = useState();

  const [images, setImages] = useState();

  const URL_BASE = import.meta.env.VITE_REACT_APP_URL
  const url = `${URL_BASE}/product_images`;

  useEffect(()=>{

    axios.get(url,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(res => setSetImage(res.data))
        .catch(error => console.log(error))
  },[]) 

  useEffect(()=> {
    if(setImage){
        setImage.find(element => {
            if(element.productId == prodPuchase.product.id){
                setImages(element)
            }
        })
        console.log(setImage)
    }
  }, [setImage])

  const fechaShort = fecha.toLocaleDateString(fecha);

  return (
    <section className="purchases__cart">
      <div className="purchases__img">

      <img src={images?.url} alt="" />
        
      </div>
      <div className="purchases__cart-footer">
        <h3>{prodPuchase.product.title}</h3>

        <div className="date">
          <span>{prodPuchase.quantity}</span>
          <span>{fechaShort}</span>
        </div>
        <p>
            <span>Price unit: </span>
            <span>${prodPuchase.product.price}</span>
       
        </p>

        <p>
            <span>Sub total: </span>
            <span>${prodPuchase.quantity * prodPuchase.product.price}</span>

        </p>
      </div>
    </section>
  );
};
