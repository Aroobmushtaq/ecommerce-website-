// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { clearCart } from '../../store/slices/cartSlice';
// import { addDoc, collection } from 'firebase/firestore';
// import { db } from '../../config/firebase';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// const CheckoutPage = () => {
//   const [form, setForm] = useState({ name: '', phone: '', address: '' });
//   const cartItems = useSelector(state => state.card.items);
//   const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlaceOrder = async () => {
//     if (!form.name || !form.phone || !form.address) {
//       toast.error('Please fill all fields');
//       return;
//     }

//     const order = {
//       customer: form,
//       items: cartItems,
//       total: totalPrice,
//       createdAt: new Date().toISOString(),
//     };

//     try {
//       await addDoc(collection(db, "orders"), order);
//       dispatch(clearCart());
//       navigate('/user/success');
//     } catch (error) {
//       toast.error('Failed to place order');
//       console.error(error);
//     }
//   };

//   return (
    
//     <div className="max-w-xl mx-auto mt-8 p-4 border rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Checkout</h2>
//       <input name="name" placeholder="Your Name" onChange={handleChange} className="mb-2 w-full p-2 border rounded" />
//       <input name="phone" placeholder="Phone Number" onChange={handleChange} className="mb-2 w-full p-2 border rounded" />
//       <textarea name="address" placeholder="Shipping Address" onChange={handleChange} className="mb-2 w-full p-2 border rounded" />
//       <p className="mb-4 font-semibold">Total: {totalPrice} Rs</p>
//       <button onClick={handlePlaceOrder} className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-600">
//         Place Order
//       </button>
//     </div>
//   );
// };

// export default CheckoutPage;
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../store/slices/cartSlice';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const cartItems = useSelector(state => state.card.items);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow digits in phone and limit to 11 characters
    if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length > 11) return;
      setForm(prev => ({ ...prev, phone: cleaned }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePlaceOrder = async () => {
    const { name, phone, address } = form;

    if (!name || !phone || !address) {
      toast.error('Please fill all fields');
      return;
    }

    if (!/^\d{11}$/.test(phone)) {
      toast.error('Phone number must be exactly 11 digits');
      return;
    }

    const order = {
      customer: {
        name,
        phone,
        address,
      },
      items: cartItems,
      total: totalPrice,
      createdAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "orders"), order);
      dispatch(clearCart());
      navigate('/user/success');
    } catch (error) {
      toast.error('Failed to place order');
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="name">Your Name</label>
        <input
          name="name"
          id="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="e.g. Ahmed"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone Number</label>
        <input
          name="phone"
          id="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="e.g. 03001234567"
          required
          maxLength={11}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="address">Shipping Address</label>
        <textarea
          name="address"
          id="address"
          value={form.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="e.g. Street #4, Faisalabad"
          required
        />
      </div>

      <p className="mb-4 font-semibold">Total: {totalPrice} Rs</p>

      <button
        onClick={handlePlaceOrder}
        className="w-full bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
