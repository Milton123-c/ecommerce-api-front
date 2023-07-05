import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardProduct from "../components/home/CardProduct";
import "../styles/productGlobal.css";
import Filtrar from "../components/Filtrar";
import Presentacion from "../components/Presentacion";
import Cart from "./Cart";
import Loading from "../components/Load/Loading";
import { getAllProductsCartThunk } from "../store/slices/cart.slice";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const { showSearch } = useSelector((state) => state);

  const [category, setCategory] = useState();

  const { productsGlobal } = useSelector((state) => state);

  const [useSearch, setUseSearch] = useState();

  const {cartGlobal} = useSelector(state => state)

  const dispath = useDispatch()

  const search = useRef();

  const handleSearch = () => {
    setUseSearch(search.current.value.trim());
  };

  const [showFilterTwo, setShowFilterTwo] = useState(false);

  const handleShowFilter = () => {
    setShowFilterTwo(!showFilterTwo);
  };


  useEffect(()=> {
    dispath(getAllProductsCartThunk())
  }, [])

 
  return (
    <div className="product__global">
      <Filtrar
        setShowFilterTwo={setShowFilterTwo}
        showFilterTwo={showFilterTwo}
        setCategory={setCategory}
      />
      <Presentacion products={productsGlobal} />

      <div className={`searh ${showSearch ? "searh__open" : "searh__close"}`}>
        <div className="input__container">
          <i className="bx bx-search-alt"></i>
          <input
            ref={search}
            onChange={handleSearch}
            type="search"
            name=""
            id=""
          />
        </div>

        <button className="button__filter" onClick={handleShowFilter}>
          <i className="bx bx-filter-alt"></i>
          <span>Filter</span>
        </button>
      </div>

      <section className="home__container">

        {productsGlobal ? (
          ""
        ) : (
          <div className="containerLoad">
            <div className="load__container">
            <Loading />
            </div>
           
          </div>
        )}

        {productsGlobal?.map((prod) => {
          if (category) {
            if (prod.categoryId == category.radio) {
              if (parseFloat(prod.price) < category.range) {
                if (useSearch) {
                  if (
                    prod.title
                      .toUpperCase()
                      .includes(useSearch.toUpperCase().trim())
                  ) {
                    return <CardProduct key={prod.id} product={prod} cartGlobal={cartGlobal} />;
                  }
                } else {
                  return <CardProduct key={prod.id} product={prod} cartGlobal={cartGlobal}  />;
                }
              }
            }

            if (category.radio == "all" || category.radio == null) {
              if (parseFloat(prod.price) <= category.range) {
                if (useSearch) {
                  if (
                    prod.title
                      .toUpperCase()
                      .includes(useSearch.toUpperCase().trim())
                  ) {
                    return <CardProduct key={prod.id} product={prod} cartGlobal={cartGlobal} />;
                  }
                } else {
                  return <CardProduct key={prod.id} product={prod} cartGlobal={cartGlobal} />;
                }
              }
            }
          } else {
            if (useSearch) {
              if (
                prod.title
                  .toUpperCase()
                  .includes(useSearch.toUpperCase().trim())
              ) {
                return <CardProduct key={prod.id} product={prod} cartGlobal={cartGlobal}  />;
              }
            } else {
              return <CardProduct key={prod.id} product={prod} cartGlobal={cartGlobal}  />;
            }
          }
        })}

        
      </section>


      <Footer/>
    
    
    </div>
  );
};

export default Home;
