import React, { useState } from "react";
import { useFetch } from '../hook/useFetch'
import { Card } from "../components/Card";
import homeIcon from "../assets/images/homeicon.png";


export const Home = () => {

  /* useFetch():
    Needs URL and HTTP method (can include body details if needed).
    Returns data, isLoading boolean, and error message. */
  const [url, setUrl] = useState("http://localhost:27017/allProducts");
  const { data, isLoading, error } = useFetch(url, "GET");
 let Loading = true;

  return (

    <article className="homeContainer">

      {isLoading && <section className="homeContent"> <img src={homeIcon} alt="" className="loadingImg" /> </section>}
      {error && <section className="homeContent"> <p>{error}</p> </section>}

      {data && data.products && data.products.length <= 0 && (
        <section className="homeContent">
        <p>No products...</p>
        </section>
      )}
{/* show product-list if products exists */}
      {data && data.products && data.products.length >= 1 && (
        <section className="gridContainer___Card">
          {data.products.map((element) => (
            <Card element={element} key={element._id} />
          ))}
        </section>
      )}





    </article>


  );
};


