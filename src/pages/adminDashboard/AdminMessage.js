import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, deleteMessage } from '../../store/slices/messageSlice';
import toast from 'react-hot-toast';
export default function AdminMessages() {
  const dispatch = useDispatch();
  const { items: allMessages, status } = useSelector(state => state.message);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);
const handleDelete = async (id) => {
  toast(
    (t) => (
      <span>
        Are you sure?
        <div className="mt-2 flex gap-2 justify-end">
          <button
            onClick={async () => {
              await dispatch(deleteMessage(id));
              toast.dismiss(t.id);
              toast.success('Message deleted');
            }}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-300 px-3 py-1 rounded text-sm"
          >
            Cancel
          </button>
        </div>
      </span>
    ),
    {
      duration: 5000,
    }
  );
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
