// store/slices/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../config/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

// Fetch all orders
export const getAllOrders = createAsyncThunk('orders/getAll', async () => {
  const snapshot = await getDocs(collection(db, 'orders'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

// ✅ Delete specific order
export const deleteOrder = createAsyncThunk('orders/delete', async (orderId) => {
  await deleteDoc(doc(db, 'orders', orderId));
  return orderId;
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(order => order.id !== action.payload);
      });
  }
});

export default orderSlice.reducer;
