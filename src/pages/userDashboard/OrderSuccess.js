import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">🎉 Order Placed Successfully!</h1>
      <p className="mb-6">Thank you for shopping with us.</p>
      <Link to="/user/" className="text-blue-500 underline">Go back to Home</Link>
    </div>
  );
};

export default OrderSuccess;
