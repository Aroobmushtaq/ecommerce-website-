import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../store/slices/orderSlice";
import { fetchMessages } from "../../store/slices/messageSlice";
import { getProducts } from "../../store/slices/adminProducts.slice";

const AdminHome = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.orders);
  const messages = useSelector((state) => state.message.items || []);
  const products = useSelector((state) => state.products.items || []);

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(fetchMessages());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <SummaryCard title="Total Products" count={products.length} />
        <SummaryCard title="Total Orders" count={orders?.length || 0} />
        <SummaryCard title="Messages" count={messages.length} />
      </div>

      {/* Recent Orders */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        <div className="bg-white shadow rounded p-4">
          {orders?.length > 0 ? (
            orders.slice(0, 3).map((order) => (
              <div key={order.id} className="border-b py-2 text-sm">
                <strong>{order.customer?.name || "No Name"}</strong> – {order.total} Rs
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No orders yet.</p>
          )}
        </div>
      </div>

      {/* Recent Messages */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Messages</h3>
        <div className="bg-white shadow rounded p-4">
          {messages.length > 0 ? (
            messages.slice(0, 3).map((msg) => (
              <div key={msg.id} className="border-b py-2 text-sm">
                <strong>{msg.name || "User"}</strong>: {msg.message}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No messages yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, count }) => (
  <div className="bg-white rounded shadow p-4 text-center">
    <h4 className="text-lg font-medium text-gray-700">{title}</h4>
    <p className="text-2xl font-bold text-gray-900 mt-2">{count}</p>
  </div>
);

export default AdminHome;
