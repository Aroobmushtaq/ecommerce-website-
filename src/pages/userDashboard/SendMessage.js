import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../store/slices/messageSlice';
import toast from 'react-hot-toast';
export default function SendMessage() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch(sendMessage({
      userId: user?.id || '',
      userName: user?.name || '',
      email: user?.email || '',
      message: text
    }));
    setText('');
    toast.success('Message sent');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Send a Message</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-gray-900 text-white px-4 py-2 mt-2 rounded hover:bg-gray-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}
