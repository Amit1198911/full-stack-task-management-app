import React, { useEffect, useState } from "react";
import Data from "../component/MenuData";
import Card from "../component/Card";
import { Link } from "react-router-dom";
// import {ItemDetails} from './ItemsDetails';
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cart from '../rtk/store'
import ItemDetails from "./ItemsDetails";


const Cards = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setData(Data); // Load the data into the state
  }, []);

  const handleProductClick = (item) => {
    navigate(`/itemdetails/${item.id}`);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center py-6 bg-gray-300">
    {/* Responsive Grid Container */}
    <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item) => (
        <Card
          key={item.id}
          item={item}
          onClick={() => handleProductClick(item)}
        />
      ))}
    </div>
  </div>
  
  );
};

export default Cards;
