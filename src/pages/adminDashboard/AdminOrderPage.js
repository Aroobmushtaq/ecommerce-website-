import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, deleteOrder } from "../../store/slices/orderSlice";
const AdminOrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (confirmDelete) {
      dispatch(deleteOrder(id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">All Orders</h2>

      {loading ? (
        <p className="text-center text-lg">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-800 text-white text-left text-sm uppercase">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Customer Info</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}
                >
                  <td className="px-4 py-3 text-sm">{index + 1}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{order.customer?.name || "N/A"}</p>
                    <p className="text-sm text-gray-500">{order.customer?.phone}</p>
                    <p className="text-sm text-gray-500">{order.customer?.address}</p>
                  </td>
                  <td className="px-4 py-3">
                    {order.items.map((item, i) => (
                      <div key={i} className="text-sm">
                        {item.name} × {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-3">{order.total || 0} Rs</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
