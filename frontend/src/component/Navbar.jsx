import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeCart } from "../rtk/cartSlice";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const getData = useSelector((state) => state.cart);
  console.log(getData);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleDelete = (item) => {
    if (item?.id) {
      dispatch(removeCart(item));
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProductClick = (item) => {
    // Ensure `item` is defined before navigating
    if (item?.id) {
      navigate(`/itemdetails/${item.id}`);
    } else {
      console.error("Item is undefined or missing an ID:", item);
    }
  };

  const handleOrder = async () => {
    if (!getData.items.length) {
      alert("Your cart is empty!");
      return;
    }

    // Assuming userId is stored in Redux or localStorage
    const userId = localStorage.getItem("userId");
    console.log("User ID:", userId);

    const totalamt = getData.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const orderData = {
      userId,
      items: getData.items.map((item) => ({
        menuItem: item.id, // Ensure your frontend uses the correct ID
        quantity: item.quantity,
      })),
      totalamt,
    };

    try {
      const response = await axios.post(
        "https://full-stack-task-management-backend-fmmf.onrender.com/api/order/add",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Order placed successfully!");
      // Optionally clear the cart after order is placed
      // dispatch(clearCart()); // Uncomment if you have a clearCart action
    } catch (error) {
      console.error(
        "Error placing order:",
        error.response?.data || error.message
      );
      alert(
        `Order failed: ${
          error.response?.data?.message || "Something went wrong"
        }`
      );
    }
  };

  const total = () => {
    let sum = 0;
    getData.items.reduce((acc, curr) => (sum += curr.price), 0);
    return sum;
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md sm:sticky top-0">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left Section: Logo */}
        <div className="text-lg font-semibold">
          <a href="/" className="hover:text-gray-300">
            BrandName
          </a>
        </div>

        {/* Center Section: Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <a href="#about" className="hover:text-gray-300">
            About
          </a>
          <a href="#services" className="hover:text-gray-300">
            Services
          </a>
          <Link to="/order/orders" className="hover:text-gray-300">
            Orders
          </Link>
        </div>

        {/* Right Section: Cart Icon */}
        <div className="flex items-center space-x-4">
          <a
            href="#cart"
            className="relative flex items-center hover:text-gray-300"
          >
            {/* Cart Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h16m-8-7v6m-2-6v6m4-6v6"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              />
            </svg>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {getData?.items?.length ? (
                <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
                  <h2 className="text-lg font-bold mb-4 text-gray-700">
                    Items in Your Cart
                  </h2>
                  <div className="w-full text-left border-slate-900">
                    <div className="bg-blue-500 text-white grid grid-cols-3">
                      <div className="px-4 py-2 ">Photo</div>
                      <div className="px-4 py-2">Restaurant Name</div>
                      <div className="px-4 py-2  text-center">Action</div>
                    </div>
                    {getData.items.map((item, index) => (
                      <div
                        key={index}
                        className="hover:bg-slate-400 hover:text-white grid grid-cols-3  items-center"
                        onClick={handleClose}
                      >
                        <div className="px-4 py-2">
                          <img
                            src={item?.image}
                            alt={item?.name}
                            className="w-40 h-32 rounded-md object-cover"
                            onClick={() => handleProductClick(item)}
                          />
                        </div>
                        <div className="px-5 text-gray-700 font-medium">
                          {item?.name}
                          <div className="text-gray-600 mr-2 flex justify-start">
                            <p>Quantity :</p>
                            <p className="ml-2">{item?.quantity}</p>
                          </div>
                        </div>
                        <div className="px-0  flex justify-center">
                          <button
                            onClick={() => handleDelete(item)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <MdDelete className="text-4xl" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    {total() > 0 && (
                      <div className="flex justify-between mt-4">
                        <p className="font-bold">Total : </p>
                        <p className="font-bold ml-2">{total()}</p>
                      </div>
                    )}
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                      onClick={handleOrder}
                    >
                      Order
                    </button>
                  </div>
                </div>
              ) : (
                <MenuItem onClick={handleClose} className="text-gray-600">
                  No items in cart
                </MenuItem>
              )}
            </Menu>
            {/* Cart Badge */}
            <span className="absolute top-0 right-3 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full -translate-x-2">
              {getData?.items?.length ?? 0}
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
