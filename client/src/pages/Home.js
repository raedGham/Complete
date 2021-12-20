import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";

const Home = () => {

  return (
    <>
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>
      <h4 className="text-center p-3 mt-3 mb-3 bg-light"> New Arrivals </h4>
      <NewArrivals/>
      <h4 className="text-center p-3 mt-3 mb-3 bg-light"> Best Sellers </h4>
      <BestSellers/>
    </>
  );
};

export default Home;
