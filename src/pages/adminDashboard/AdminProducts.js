import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useState } from 'react'
import React, { useRef } from 'react';
import toast from 'react-hot-toast'
import { addProduct, deleteProduct, getProducts, updateProduct } from '../../store/slices/adminProducts.slice'
function AdminProducts() {
  const dispatch = useDispatch()
  const fileInputRef = useRef(null);
  const { items: products, loading } = useSelector((state) => state.products);
  const [form, setForm] = useState({ name: "", price: "", category: "", description: "", image: "" })
  const [editId, setEditId] = useState(null)
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.price || !form.category || !form.description || !form.image) {
      toast.error("Please fill in all fields and wait for image upload.");
      return;
    }
    if (editId) {
      dispatch(updateProduct({ id: editId, updatedData: form }));
      toast.success("Product updated!");
    } else {
      dispatch(addProduct(form));
      toast.success("Product added!");
    }
    setForm({ name: "", price: "", category: "", description: "", image: "" });
    setEditId(null);
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
        {form.image && (
          <div className="mb-2">
            <p className="text-gray-700 mb-1">Current Image:</p>
            <img src={form.image} alt="Preview" className="w-32 h-32 object-cover rounded" />
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2"
        />

        <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded">
          {editId ? 'Update' : 'Add'} Product
        </button>
      </form>
      <h2 className="text-xl font-semibold mt-8 mb-4">All Products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow">
              <img src={product.image} alt={product.name} className="w-full h-40 object-contain rounded mb-2" />
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-sm">Price: {product.price} Rs</p>
              <p className="text-sm">Category: {product.category}</p>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <button
                onClick={() => dispatch(deleteProduct(product.id))}
                className="bg-red-600 text-white px-3 py-1 rounded mt-2"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setEditId(product.id);
                  setForm({
                    name: product.name,
                    price: product.price,
                    category: product.category,
                    description: product.description,
                    image: product.image
                  });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded mt-2 ml-1"
              >
                Edit
              </button>

            </div>

          ))}
        </div>
      )}
    </div>
  )
}

export default AdminProducts
