// client/src/pages/OrdersPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      let res;

      if (user.role === "customer") {
        res = await axios.get("http://localhost:5000/api/orders");
      } else if (user.role === "provider") {
        res = await axios.get("http://localhost:5000/api/orders/provider");
      } else if (user.role === "delivery") {
        res = await axios.get("http://localhost:5000/api/orders/placed");
      }

      setOrders(res.data.orders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      alert("Failed to load orders.");
    }
  }

  async function markAsDelivered(orderId) {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/orders/${orderId}/deliver`
      );

      alert("Order marked as delivered!");
      fetchOrders(); // Refresh list
    } catch (err) {
      console.error("Failed to deliver order:", err);
      alert("Failed to deliver order.");
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border rounded-lg p-4 shadow flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Meal ID:</strong> {order.meal_id}
                </p>
                <p>
                  <strong>Quantity:</strong> {order.quantity}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      order.status === "delivered"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }
                  >
                    {order.status}
                  </span>
                </p>
              </div>

              {/* Show delivery button only for delivery users */}
              {user.role === "delivery" && order.status === "placed" && (
                <button
                  onClick={() => markAsDelivered(order.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Mark as Delivered
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
