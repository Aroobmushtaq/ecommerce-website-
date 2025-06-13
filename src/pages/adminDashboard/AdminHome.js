import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/slices/userSlice';
import { fetchOrders } from '../../store/slices/orderSlice';
import { fetchMessages } from '../../store/slices/messageSlice';
import { fetchProducts } from '../../store/slices/productSlice';

const AdminHome = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.orders);
  const { items: messages } = useSelector((state) => state.message);
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchOrders());
    dispatch(fetchMessages());
    dispatch(fetchProducts());
  }, [dispatch]);

  const adminUsers = users?.filter((u) => u.role === 'admin') || [];
  const completedPayments = orders?.filter((o) => o.status === 'completed') || [];

  const Card = ({ title, value }) => (
    <div className="bg-white shadow p-4 rounded text-center">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card title="Total Users" value={users.length} />
        <Card title="Total Orders" value={orders.length} />
        <Card title="Total Admins" value={adminUsers.length} />
        <Card title="Messages" value={messages.length} />
        <Card title="Total Products" value={products.length} />
        <Card title="Completed Payments" value={completedPayments.length} />
      </div>
    </div>
  );
};

export default AdminHome;
