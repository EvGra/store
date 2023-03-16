import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByPrice } from "../../features/products/productsSlice";
import { Banner } from "../Banner/Banner";
import { Categories } from "../Categories/Categories";
import { Poster } from "../Poster/Poster";
import { Products } from "../Products/Products";

export const Home = () => {
  const dispatch = useDispatch();

  const {
    products: { list, filtered },
    categories,
  } = useSelector((state) => state);

  useEffect(() => {
    if (!list.length) {
      return;
    }
    dispatch(filterByPrice(100));
  }, [dispatch, list.length]);
  return (
    <>
      <Poster />
      <Products products={list} title="Trending" amount={5} />
      <Categories products={categories.list} title="Worth seeing" amount={5} />
      <Banner />
      <Products products={filtered} title="Less then 100$" amount={5} />
    </>
  );
};
