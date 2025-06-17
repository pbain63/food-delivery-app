// client/src/pages/DeliveryPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function DeliveryPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  }

  async function markAsDelivered(orderId) {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/deliver`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Marked as delivered");
      fetchOrders();
    } catch (err) {
      console.error("Delivery update failed:", err);
    }
  }

  const deliveryOrders = orders.filter((order) => order.status === "placed");

  return (
    <div>
      <h2>Delivery Dashboard</h2>
      {deliveryOrders.length === 0 ? (
        <p>No orders to deliver.</p>
      ) : (
        <ul>
          {deliveryOrders.map((order) => (
            <li key={order.id}>
              <strong>{order.meal_title}</strong> for {order.customer_name} -{" "}
              {order.status}
              <button onClick={() => markAsDelivered(order.id)}>
                Mark Delivered
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DeliveryPage;
