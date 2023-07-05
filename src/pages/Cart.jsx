import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsCartThunk } from "../store/slices/cart.slice";
import ProductInCard from "../components/Card/ProductInCard";
import usePurchases from "../hooks/usePurchases";
import "../styles/cart.css";
import { setShowCart } from "../store/slices/showCart.slice";
import Loading from "../components/Load/Loading";
import alertity from "alertifyjs";

const Cart = () => {
  const { showCart } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsCartThunk());
  }, []);

  const { cartGlobal } = useSelector((state) => state);

  const totalPriceCart = cartGlobal?.reduce(
    (acc, cv) => acc + cv.quantity * cv.product.price,
    0
  );

  const { buyThisCart, errorBuy } = usePurchases();

  const handlePurchased = () => {
    if (errorBuy) return alertity.alert("Error!!", "Sorry there was an error");

    if (cartGlobal?.length) {
      buyThisCart();
      dispatch(setShowCart(!showCart));
      alertity.alert("Exelent", "Purchases made");
    } else {
      alertity.alert("Error!!", "Sorry there is no product in the cart");
      dispatch(setShowCart(!showCart));
    }
  };

  const handleShowCar = () => {
    dispatch(setShowCart(!showCart));
  };

  const datos = JSON.parse(localStorage.getItem("user"));

  return (
    <section
      className={`cart ${
        showCart ? "cart__open-article" : "cart__close-article"
      }`}
    >
      <button className="cart__close" onClick={handleShowCar}>
        <i className="bx bx-x"></i>
      </button>

      <h2 className="cart__title">Shopping cart</h2>

      <div className="cart__showpping">
        {cartGlobal ? (
          ""
        ) : datos ? (
          <div className="load">
            <Loading />
          </div>
        ) : (
          ""
        )}
        {cartGlobal?.map((prodCart) => (
          <ProductInCard key={prodCart.id} prodCart={prodCart} />
        ))}
      </div>

      <footer className="cart__footer">
        <span className="cart__title-footer">Total:</span>
        <h3 className="cart__title-price">${totalPriceCart}</h3>

        <div className="cart__footer-button">
          <button onClick={handlePurchased} className="cart__btn">
            Buy now
          </button>
        </div>
      </footer>
    </section>
  );
};

export default Cart;
