import React, { useState } from "react";
import { useFetch } from '../hook/useFetch'
import { Card } from "../components/Card";


export const Home = () => {

  /* useFetch():
    Needs URL and HTTP method (can include body details if needed).
    Returns data, isLoading boolean, and error message. */
  const [url, setUrl] = useState("http://localhost:27017/allProducts");
  const { data, isLoading, error } = useFetch(url, "GET");


  return (

    <article className="homeContainer">

      {isLoading && <p>LOADING...</p>}
      {error && <p>{error}</p>}

      {data && data.products && data.products.length <= 0 && (

        <p>no products...</p>

      )}
{/* show product-list if products exists */}
      {data && data.products && data.products.length >= 1 && (
        <section className="gridContainer___Card">
          {data.products.map((element) => (
            <Card element={element} />
          ))}
        </section>
      )}





    </article>


  );
};


