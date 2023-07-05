import axios from "axios";
import getConfiToken from "../utils/getConfiToken";
import { getAllProductsCartThunk } from "../store/slices/cart.slice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const UseCrudCart = () => {
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const URL_BASE = import.meta.env.VITE_REACT_APP_URL

  const addProductToCart = (data) => {
    const url = `${URL_BASE}/cart`;
    axios
      .post(url, data, getConfiToken())
      .then(() => {
        setError(false);
        dispatch(getAllProductsCartThunk());
        
      })
      .catch((err) => {
        console.log(err);
        setError(true)});
  };

  const deleteProductFromCard = (id) => {
    const url = `${URL_BASE}/cart/${id}`;

    axios
      .delete(url, getConfiToken())
      .then(() => dispatch(getAllProductsCartThunk()))
      .catch((error) => console.log(error));
  };

  const updateProductFromCard = (id, data) => {
    const url = `${URL_BASE}/cart/${id}`;
    axios
      .put(url, data, getConfiToken())
      .then(() => {
        setError(false);
        dispatch(getAllProductsCartThunk());
        
      })
      .catch(() => setError(true));
  };

  return {
    addProductToCart,
    deleteProductFromCard,
    updateProductFromCard,
    error,
    setError,
  };
};
export default UseCrudCart;
