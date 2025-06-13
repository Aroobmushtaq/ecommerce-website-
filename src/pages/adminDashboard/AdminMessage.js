import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, deleteMessage } from '../../store/slices/messageSlice';

export default function AdminMessages() {
  const dispatch = useDispatch();
  const { items: allMessages, status } = useSelector(state => state.message);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      dispatch(deleteMessage(id));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Messages</h2>

      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        allMessages.length > 0 ? (
         allMessages.map((msg) => (
  <div key={msg.id} className="border p-4 mb-3 rounded shadow flex justify-between items-start">
    <div>
        <p className="font-semibold">{msg.name}</p>
      <p className="font-semibold">{msg.email}</p>
      <p className="mt-2">{msg.message}</p>
    </div>
    <button
      onClick={() => handleDelete(msg.id)}
      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
    >
      Delete
    </button>
  </div>
))

        ) : (
          <p>No messages found.</p>
        )
      )}
    </div>
  );
}
