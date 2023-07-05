import React, { useEffect, useState } from "react";
import UseCrudCart from "../../hooks/UseCrudCart";
import Loading from "../Load/Loading";
import alertify from "alertifyjs";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsCartThunk } from "../../store/slices/cart.slice";
import { useNavigate } from "react-router-dom";

const ProductIdInfo = ({ product }) => {
  const [queantity, setQueantity] = useState(1);

  const [showLoading, setShowLoading] = useState(false);

  const { cartGlobal } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsCartThunk());
  }, []);


  const handleMas = () => {
    setQueantity(queantity + 1);
  };
  const handleMinus = () => {
    if (queantity - 1 >= 1) {
      setQueantity(queantity - 1);
    }
  };

  const { addProductToCart, updateProductFromCard, error, setError } = UseCrudCart();

  const navigate = useNavigate()

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");

    if (token) {

        const cartQuantity = cartGlobal?.find(
            (element) => element.product.id == product.id
          )

     if(cartQuantity){
        setShowLoading(true);
        updateProductFromCard(cartQuantity.id, {quantity: queantity})
      
     }else{
        setShowLoading(true);
        const data = {
          quantity: queantity,
          productId: product.id,
        };
        addProductToCart(data);
      
     }

    } else {
      navigate('/login')
    }
  };
  useEffect(() => {
    if (error != undefined) {
      if (error) {
        setShowLoading(false);
        alertify.alert("Error!", "Sorry, there was an error in the purchase");
        setError();
      } else {
        setShowLoading(false);
        alertify.alert("Congratulations!", "Purchase made");
        setError();
      }
    }
  }, [error]);

  return (
    <section className="product__info">
      {showLoading && (
        <div className="loading__product-id">
          <Loading />
        </div>
      )}
      <h3 className="product__info-brand">{product?.brand}</h3>
      <h2 className="product__info-title">{product?.title}</h2>
      <p className="product__info-description">{product?.description}</p>
      <footer className="product__footer">
        <div className="product__footer-price">
          <span className="product__price-label">
            ${parseFloat(product?.price) + 100}
          </span>
          <span className="product__price"> ${product?.price}</span>
        </div>
        <div className="product__footer-quantity">
          <span>Quentity</span>
          <div className="product__footer-button">
            <button onClick={handleMinus}>-</button>
            <div>{queantity}</div>
            <button onClick={handleMas}>+</button>
          </div>
        </div>

        <div className="product__footer-buy">
          <button onClick={handleAddToCart}>
            Add To Cart <i className="bx bx-cart"></i>
          </button>
          <div className={`tolkit`}>
            <span>Buy Naw</span>
            <span></span>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ProductIdInfo;
