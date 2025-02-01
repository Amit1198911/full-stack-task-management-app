import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Data from '../component/MenuData'; // Assuming this is where your data is stored
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeCart } from "../rtk/cartSlice";
import { useNavigate } from "react-router-dom";



const ItemDetails = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const [item, setItem] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (item) => {
    if (item?.id) {
      dispatch(removeCart(item));
    }
    navigate('/');  
  };

  useEffect(() => {
    // Find the item based on the ID from URL
    const foundItem = Data.find((item) => item.id === parseInt(id));
    setItem(foundItem); // Set the item state with the found item
  }, [id]);

  if (!item) {
    return <div>No item details available.</div>; // Handle case when item is not found
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Item Details</h1>

      <div className="flex sm:flex-row flex-col gap-5">
        {/* Image Section */}
        <div className="sm:w-1/2">
          <img
            src={item.image || 'https://via.placeholder.com/300'} // Fallback image
            alt={item.name || 'Item Image'}
            className="w-full h-60 object-cover rounded bg-red-500"
          />
        </div>

        {/* Details Section */}
        <div className="sm:w-1/2 flex sm:flex-row flex-col gap-5">
          {/* Left Column */}
          <div className="w-full sm:w-1/2">
            <h1 className="text-lg font-semibold">Restaurant:</h1>
            <p className="text-gray-600">{item.restaurant || 'N/A'}</p>

            <h1 className="text-lg font-semibold mt-3">Price:</h1>
            <p className="text-gray-600">${item.price?.toFixed(2) || '0.00'}</p>

            <h1 className="text-lg font-semibold mt-3">Dishes:</h1>
            <p className="text-gray-600">{item.dishes || 'N/A'}</p>

            <h1 className="text-lg font-semibold mt-3">Total:</h1>
            <p className="text-gray-600">${item.total?.toFixed(2) || '0.00'}</p>
          </div>

          {/* Right Column */}
          <div className="w-full sm:w-1/2">
            <h1 className="text-lg font-semibold">Rating:</h1>
            <p className="text-gray-600">⭐ {item.rating || 'N/A'}</p>

            <h1 className="text-lg font-semibold mt-3">Order Review:</h1>
            <p className="text-gray-600">{item.review || 'No reviews yet.'}</p>

            <button className="mt-5 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
            onClick={() => handleDelete(item)}
            >
               <MdDelete className="text-4xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
