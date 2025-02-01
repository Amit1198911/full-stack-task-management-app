import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../rtk/cartSlice";

const Card = ({ item, onClick }) => {
  const dispatch = useDispatch();

  const handleAddCart = (e) => {
    e.stopPropagation(); // Prevent parent `onClick` from triggering
    dispatch(addToCart(item));
  };

  return (
    <div
      onClick={onClick}
      className="border rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl bg-white cursor-pointer hover:border-gray-300"
    >
      {/* Image Section */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      {/* Card Details */}
      <div className="p-4">
        {/* Product Name */}
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {item.name}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {item.description}
        </p>

        {/* Price & Rating */}
        <div className="flex justify-between items-center mt-3">
          <p className="text-lg font-bold text-green-600">
            ${item.price.toFixed(2)}
          </p>
          <p className="text-yellow-500 flex items-center">
            ⭐ {item.rating}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddCart}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
