import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
      if (!userId) {
        console.error("User not logged in!");
        return;
      }

      try {
        const response = await axios.get(
          `https://full-stack-task-management-backend-fmmf.onrender.com/api/order/orders`
        );
        setOrders(response.data);
        console.log("Orders:", response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Items</th>
              <th className="border p-2">Total Amount</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center">
                {" "}
                {/* ✅ Added key to order row */}
                <td className="border p-2">{order._id}</td>
                <td className="border p-2">
                  {order.items.map((item) => (
                    <div key={item.menuItem._id}>
                      {" "}
                      {/* ✅ Added unique key for items */}
                      {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="border p-2">₹{order.totalamt}</td>
                <td className="border p-2">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
