import { useEffect, useState } from "react";
import UseFetch from "../hooks/UseFetch";
import "../styles/filtrar.css";
import { useForm } from "react-hook-form";

const Filtrar = ({ setCategory, showFilterTwo, setShowFilterTwo }) => {

    const URL_BASE = import.meta.env.VITE_REACT_APP_URL

  const url = `${URL_BASE}/categories`;

  const priceUrl = `${URL_BASE}/products`;

  const [category, getCategory, error] = UseFetch(url);
  const [price, getPrice, errorPrice] = UseFetch(priceUrl);

  const [priceObj, setPriceObj] = useState();

  const [showRange, setShowRange] = useState();
  const { register, setValue, handleSubmit, reset } = useForm();

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    getPrice();
  }, []);

  useEffect(() => {
    if (price) {
      const newPrice = price?.map((pr) => parseFloat(pr.price));
      const maxPrice = Math.max(...newPrice);
      const minPrice = Math.min(...newPrice);

      setPriceObj({ maxPrice, minPrice });
      setShowRange(maxPrice);
    }
  }, [price]);

  const submit = (data) => {
    setCategory(data);
  };

  const changeRange = (event) => {
    const { name, value } = event.target;
    setShowRange(value);
    setValue("range", value);
  };

  const [showFilter, setShowFilter] = useState(false);
  useEffect(()=>{
    setShowFilter(showFilterTwo)
  }, [showFilterTwo])

  const handleShowFilter = () => {
    setShowFilter(!showFilterTwo);
    setShowFilterTwo(!showFilterTwo)
  };

  return (
    <aside
      className={`filtrar ${showFilter ? "open__filter" : "close__filter"}`}
    >
      <button onClick={handleShowFilter} className={`btn__filtrar--close`} >
        <i className="bx bx-window-close"></i>
      </button>

      <p className="filtrar__title">Filters</p>

      <article>
        <form onSubmit={handleSubmit(submit)} className="category__form">
          <article className="open__price">
            <p>Price</p>
            <p>
              <i className="bx bx-chevron-down"></i>
            </p>
          </article>
          <article className="price">
            {priceObj ? (
              <>
                <article className="category__price">
                  <label htmlFor="price">${showRange}</label>
                  <span>${priceObj?.minPrice}</span>
                  <span>${priceObj.maxPrice}</span>
                  <input
                    {...register("range", {
                      min: priceObj.minPrice,
                      max: priceObj.maxPrice,
                    })}
                    type="range"
                    id="rango"
                    name="rango"
                    min={priceObj.minPrice}
                    max={priceObj.maxPrice}
                    defaultValue={priceObj.maxPrice}
                    onChange={changeRange}
                    step="10"
                  />
                </article>
              </>
            ) : (
              ""
            )}
          </article>

          <article className="filtrar__category">
            <p>Category</p>
            <p>
              <i className="bx bx-chevron-down"></i>
            </p>
            <article className="category__content">
              <article className="radio">
                <label htmlFor="all">All Category</label>
                <input
                  {...register("radio")}
                  type="radio"
                  value="all"
                  name="radio"
                  id="all"
                />
              </article>

              {category?.map((cate) => (
                <article className="radio" key={cate.id}>
                  <label htmlFor={cate.id}>{cate.name}</label>
                  <input
                    {...register("radio")}
                    type="radio"
                    name="radio"
                    value={cate.id}
                    id={cate.id}
                  />
                </article>
              ))}
            </article>
          </article>

           <div className="filter__submit">
           <button className="submit" type="submit">Filtrar</button>
       </div> 

         </form>
      </article>
    </aside>
  );
};

export default Filtrar;
