import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products } = useSelector((state) => state.products);

  // Get unique categories from product list
  const categories = ["all", ...new Set(products.map((p) => p.category?.toLowerCase()))];

  // Filter products by name and category
  const filteredProducts = products.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "all" || product.category?.toLowerCase() === category;
    return matchesName && matchesCategory;
  });

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/user/cart");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Search Products</h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by product name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded bg-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border p-2 rounded shadow">
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <p className="font-bold text-blue-700">{product.price} Rs</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-600 w-full"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
