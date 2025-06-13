import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/slices/adminProducts.slice";
import { addToCart } from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/user/cart");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white py-36 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-lg max-w-xl mx-auto">
          Discover quality products at unbeatable prices. Shop the latest trends now!
        </p>
      </div>

      {/* Product Listing */}
      <div className="flex-1 p-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Products</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-sm mt-1 mb-2">{product.description}</p>
                <p className="text-black-600 font-bold text-lg">{product.price} Rs</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-auto bg-gray-900 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition duration-200"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-10">
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Online Store. All rights reserved.
        </div>
        <div className="text-xs mt-1 text-gray-500">
          Designed with 💙 using React & Tailwind CSS
        </div>
      </footer>
    </div>
  );
};

export default UserHome;
