// client/src/pages/OrdersPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const url =
          user.role === "provider"
            ? "http://localhost:5000/api/orders/placed"
            : "http://localhost:5000/api/orders";

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data.orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    if (token && user) {
      fetchOrders();
    }
  }, [token, user]);

  const markAsPlaced = async (orderId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/orders/${orderId}/place`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? response.data.order : order
        )
      );
    } catch (error) {
      console.error("Failed to mark order as placed:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p>Order ID: {order.id}</p>
                <p>Meal ID: {order.meal_id}</p>
                <p>Quantity: {order.quantity}</p>
                <p>Status: {order.status}</p>
              </div>

              {user.role === "provider" && order.status === "pending" && (
                <button
                  onClick={() => markAsPlaced(order.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Mark as Placed
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;
