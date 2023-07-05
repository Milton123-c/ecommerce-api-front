import { useEffect, useState } from "react";
import usePurchases from "../hooks/usePurchases";
import { ProductPurchase } from "../components/Purchased/ProductPurchase";
import {useNavigate} from 'react-router-dom'
import "../styles/purchases.css";
import Loading from "../components/Load/Loading";

export const Purchased = () => {
  const { purchases, getAllProductPurchased } = usePurchases();

  const [stopLoad, setStopLoad] = useState(false);

    const navigate = useNavigate()
 
  useEffect(() => {
    getAllProductPurchased();

  }, []);

  useEffect(()=> {
    if(purchases){
        setStopLoad(true)
    }
    setTimeout(()=>{
        setStopLoad(true)
    }, 5000)

  }, [purchases])

  const handlePreviews = () => {
    navigate('/')
  };

  return (
    <div className="purchases">
      
      <article className="purchases__main">
      <p className="nave left">
        Home
        <span className="punto"></span>
        <span>Purchases</span>
        <button onClick={handlePreviews}>
          <i className="bx bx-arrow-from-right"></i>
        </button>
      </p>

      <h2 className="purchases__title">Purchased</h2>

      <article className="purchases__container">

        {
            stopLoad ?

            ''
            :
            <div className="containerLoad">
            <div className="load__container">
            <Loading />
            </div>
           
          </div>
        }
        {
            !purchases && 'No hay Compras'
        }

      {purchases?.map((prodPuchase) => (
        <ProductPurchase key={prodPuchase.id} prodPuchase={prodPuchase} />
      ))}
      </article>
      </article>

    </div>
  );
};
