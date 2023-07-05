
import UseCrudCart from "../../hooks/UseCrudCart";
import { useEffect, useState } from "react";
import Loading from "../Load/Loading";
import DeleteProduct from "../AlertDelete/DeleteProduct";


const ProductInCard = ({ prodCart }) => {
  const { deleteProductFromCard, updateProductFromCard, error, setError } =
    UseCrudCart();

  const [showLoading, setShowLoading] = useState(false);

  const [showPromDelete, setShowPromDelete] = useState(false);

  const handleDeleteCart = () => {
    setShowPromDelete(true)
  };

 

  const handleMinus = () => {
    if (prodCart.quantity - 1 < 1) {
        setShowPromDelete(true)
        
       
    } else {
      setShowLoading(!showLoading);
      const setQuantity = prodCart.quantity - 1;
      updateProductFromCard(prodCart.id, { quantity: setQuantity });
    }
  };

  const handlePlus = () => {
    setShowLoading(true)
    const setQuantity = prodCart.quantity + 1;
    updateProductFromCard(prodCart.id, { quantity: setQuantity });
  };

  useEffect(() => {
    if (error != undefined) {
      if (error) {
        console.log("hay un error");
        setError();
      } else {
        setShowLoading(false);
        setError();
      }
    }
  }, [error]);


  const handleDeleteOk = () =>  {
        setShowLoading(true)
        deleteProductFromCard(prodCart.id);
  }

  const handleDeleteNo = () =>{
        setShowPromDelete(false)
  } 

  return (
    <article className="article__cart">
      {showPromDelete && <DeleteProduct  handleDeleteNo={handleDeleteNo} handleDeleteOk={handleDeleteOk} />}

      {showLoading && (
        <div className="load__product-cart">
          <Loading />
        </div>
      )}

      <article className="article__cart-head">
        <article className="article__img">
          <img src={prodCart.product.productImgs[0].url} alt="" />
        </article>

        <article className="article__info">
          <span>{prodCart.product.title}</span>
          <div className="article__btn">
            <button onClick={handleMinus}>-</button>
            <span>{prodCart?.quantity}</span>
            <button onClick={handlePlus}>+</button>
          </div>
        </article>
      </article>

      <article className="article__cart-footer">
        <p>{prodCart.quantity}</p>
        <p>
          <span>Price:</span> ${prodCart.quantity * prodCart.product.price}
        </p>

        <button onClick={handleDeleteCart} className="btn__cart-delete">
          <i className="bx bx-trash"></i>
        </button>
      </article>
    </article>
  );
};

export default ProductInCard;
