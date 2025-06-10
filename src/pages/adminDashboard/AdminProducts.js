import { useDispatch } from 'react-redux'
import { useState } from 'react'
import React, { useRef } from 'react';
import toast from 'react-hot-toast'
import { addProduct } from '../../store/slices/adminProducts.slice'
function AdminProducts() {
  const dispatch = useDispatch()
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({ name: "", price: "", category: "", description: "", image: "" })
  const [editId, setEditId] = useState(null)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.price || !form.category || !form.description || !form.image) {
      toast.error("Please fill in all fields and wait for image upload.");
      return;
    }
    dispatch(addProduct(form))
    toast.success("product added")
    setForm({ name: "", price: "", category: "", description: "", image: "" })
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ecommrace");

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/djxmwzaw5/image/upload`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setForm({ ...form, image: data.secure_url });
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };
  return (
    <div className='p-8 flex justify-center items-center flex-col'>
      <h1 className='text-2xl font-bold mb-4'>Manage Products</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 mb-6 max-w-md">
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border p-2" required />
        <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="border p-2" required />
        <input type="text" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="border p-2" required />
        <input type="text" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border p-2" required />
        <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} className="border p-2" />
        <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded">
          {editId ? 'Update' : 'Add'} Product
        </button>
      </form>
    </div>
  )
}

export default AdminProducts
