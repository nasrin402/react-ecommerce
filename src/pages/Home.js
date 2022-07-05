import React, { useState, useEffect } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import BestSeller from "../components/home/BestSeller";
import NewArrivals from "../components/home/NewArrivals";

const Home = () => {

  return (
    <>
      <div>{/* JSON.stringify(products) */}</div>
      <div className="jumbotron text-center h1 text-danger font-weight-bold">
        <Jumbotron text = {["Latest Products", "New Arivals", "Best seller Products"]} />
        {/* loading ? <h2>Loading...</h2> : <h2>All products</h2> */}
      </div>
      <h4 className="text-center p-3 mt-5 mb-5 dispaly-4 jumbotron">New Arrivals</h4>
     <NewArrivals />

     <br/>
     <br/>
     <br/>
     <h4 className="text-center p-3 mt-5 mb-5 dispaly-4 jumbotron">Best Seller</h4>
     <BestSeller />
    </>
  );
};
export default Home;
