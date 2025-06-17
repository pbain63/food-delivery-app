// client/src/pages/OrdersPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              {user.role === "customer" ? (
                <>
                  <strong>{order.title}</strong> ({order.type}) –{" "}
                  {order.quantity}x @ ${order.price} <br />
                  <small>{order.description}</small> <br />
                  <em>
                    Ordered on: {new Date(order.created_at).toLocaleString()}
                  </em>
                </>
              ) : (
                <>
                  <strong>{order.title}</strong> – {order.quantity}x ordered by{" "}
                  <strong>{order.customer_name}</strong> <br />
                  <em>
                    Ordered on: {new Date(order.created_at).toLocaleString()}
                  </em>
                </>
              )}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrdersPage;
