import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { setShowCart } from "../store/slices/showCart.slice";
import Cart from "../pages/Cart";
import { setShowSearh } from "../store/slices/showSearh.slice";
import { getAllProductsCartThunk } from "../store/slices/cart.slice";

const Header = () => {
  const [btnShow, setBtnShow] = useState(false);
  const [scroll, setScroll] = useState(0);

  const { showCart } = useSelector((state) => state);

  const { cartGlobal } = useSelector((state) => state);

  const dispath = useDispatch();

  const handleOpen = () => {
    setBtnShow(true);
  };

  const handleClose = () => {
    setBtnShow(false);
  };

  window.onscroll = () => {
    setScroll(window.scrollY);
  };

  const handleCart = () => {
    dispath(setShowCart(!showCart));
  };

  const { showSearch } = useSelector((state) => state);

  const handleSearch = () => {
    dispath(setShowSearh(!showSearch));
  };

  useEffect(() => {
    dispath(getAllProductsCartThunk());
  }, []);

  return (
    <article
      className={`navbar__container ${scroll > 20 ? "scroll__navbar" : ""}`}
    >
      <Cart />

      <header className="navbar">
        <h1 className="ecommer">
          <Link className="navbar__title" to={"/"}>
            E-commerce
          </Link>
        </h1>

        <article className="navbar__cart-info">
          <span onClick={handleCart} className="navbar__cart-span uno">
            <i className="bx bxs-cart-alt"></i>
            <span>{cartGlobal?.length || 0}</span>
          </span>

          <button className="btn__open" onClick={handleOpen}>
            <i className="bx bx-menu"></i>
          </button>
        </article>

        <article className="navbar__width">
          <ul className="nav">
            <li className="nav__li">
              <Link className="nav__link" to={"/login"}>
                Login
              </Link>
              <i className="bx bx-user"></i>
            </li>
            <li className="nav__li">
              <Link className="nav__link" to={"/register"}>
                register
              </Link>
              <i className="bx bx-add-to-queue"></i>
            </li>
            <li className="nav__li">
              <Link className="nav__link" to={"/purchased"}>
                Purchases
              </Link>
              <i className="bx bx-shopping-bag"></i>
            </li>
            
            <li className="nav__li active">
              <button onClick={handleSearch} className="navbar__btn">
                Search
              </button>
              <i className="bx bx-search-alt-2"></i>
            </li>

            <li className="nav__li active">
              <span onClick={handleCart} className="navbar__cart-span dos">
                <i className="bx bxs-cart-alt"></i>
                <span>{cartGlobal?.length || 0}</span>
              </span>
            </li>
          </ul>
        </article>

        <nav className={`navbar__nav ${btnShow ? "open" : "close"}`}>
          <button onClick={handleClose} className="menu__close">
            <i className="bx bxs-x-square"></i>
          </button>

          <ul className="nav">
            <li className="nav__li" onClick={handleClose}>
              <Link className="nav__link" to={"/login"}>
                Login
              </Link>
              <i className="bx bx-user"></i>
            </li>
            <li className="nav__li" onClick={handleClose}>
              <Link className="nav__link" to={"/register"}>
                register
              </Link>
              <i className="bx bx-add-to-queue"></i>
            </li>
            <li className="nav__li" onClick={handleClose}>
              <Link className="nav__link" to={"/purchased"}>
                Purchases
              </Link>
              <i className="bx bx-shopping-bag"></i>
            </li>
            <li className="nav__li active" onClick={handleClose}>
              <button onClick={handleCart} className="navbar__btn">
                Cart
              </button>
              <i className="bx bx-store-alt"></i>
            </li>
          </ul>
        </nav>
      </header>
    </article>
  );
};

export default Header;
