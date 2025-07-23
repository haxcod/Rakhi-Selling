import { useState } from "react";
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Heart,
  Tag,
  Truck,
  Shield,
} from "lucide-react";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
   const navigate = useNavigate()
  const [cartItems, setCartItems] = useState(
    () => JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((items) => {
      const updatedCart = items.map((item) =>
        item._id === id ? { ...item, qty: newQuantity } : item
      );

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeItem = (id) => {
    setCartItems((items) => {
      const updatedCart = items.filter((item) => item._id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "rakhi2025") {
      setAppliedPromo({ code: "RAKHI2025", discount: 50, type: "fixed" });
      setPromoCode("");
    } else if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo({ code: "SAVE10", discount: 10, type: "percentage" });
      setPromoCode("");
    } else {
      alert("Invalid promo code");
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const promoDiscount = appliedPromo
    ? appliedPromo.type === "percentage"
      ? Math.round((subtotal * appliedPromo.discount) / 100)
      : appliedPromo.discount
    : 0;
  const deliveryCharge = subtotal > 299 ? 0 : 49;

  console.log(promoDiscount );
  
  const total =
    (Number(subtotal) || 0) +
    (Number(deliveryCharge) || 0) - (Number(promoDiscount) || 0);


  const handleCheckOut =()=>{
    const order = {
    items: cartItems,
    totalAmount: total, // you should define this function
    date: new Date().toISOString()
  };

 navigate('/payment', { state: { order } });
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}

        <div className="py-6">
          <div className="max-w-6xl mx-auto px-4">
            {cartItems.length === 0 ? (
              // Empty Cart State
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-600 mb-6">
                  Add some beautiful rakhis to get started!
                </p>
                <button onClick={()=>navigate('/products')} className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all">
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items - Left Column */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800">
                      Cart Items
                    </h2>

                    {cartItems.map((item) => (
                      <div
                        key={item._id}
                        className={`border-b border-gray-200 pb-6 mb-6 last:border-b-0 last:mb-0 ${
                          item.stock ===0 ? "opacity-60" : ""
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          {/* Product Image */}
                          <div className="relative">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            {item.stock ===0 && (
                              <div className="absolute inset-0 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                                <span className="text-red-600 text-xs font-bold">
                                  OUT OF STOCK
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {item.description}
                            </p>

                            {/* Price */}
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="font-bold text-lg text-gray-800">
                                ₹{item.price}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                ₹{item.originalPrice}
                              </span>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                {Math.round(
                                  ((item.originalPrice - item.price) /
                                    item.originalPrice) *
                                    100
                                )}
                                % OFF
                              </span>
                            </div>

                            {/* Quantity Controls & Actions */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {/* Quantity Controls */}
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                  <button
                                    onClick={() =>
                                      updateQuantity(item._id, item.qty - 1)
                                    }
                                    className="p-2 hover:bg-gray-100 rounded-l-lg"
                                    disabled={item.stock===0}
                                  >
                                    <Minus className="w-4 h-4 text-gray-600" />
                                  </button>
                                  <span className="px-4 py-2 font-medium">
                                    {item.qty || 1}
                                  </span>
                                  <button
                                    onClick={() =>
                                      updateQuantity(item._id, item.qty + 1)
                                    }
                                    className="p-2 hover:bg-gray-100 rounded-r-lg"
                                    disabled={item.stock===0}
                                  >
                                    <Plus className="w-4 h-4 text-gray-600" />
                                  </button>
                                </div>

                                <span className="text-sm text-gray-600">
                                  ₹{item.price * item.qty}
                                </span>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center space-x-2">
                                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                  <Heart className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => removeItem(item._id)}
                                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo Code Section */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <Tag className="w-5 h-5 mr-2 text-orange-500" />
                      Promo Code
                    </h3>

                    {appliedPromo ? (
                      <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <Tag className="w-5 h-5 mr-2 text-green-600" />
                          <span className="font-medium text-green-800">
                            {appliedPromo.code}
                          </span>
                          <span className="text-sm text-green-600 ml-2">
                            (-₹{promoDiscount} discount applied)
                          </span>
                        </div>
                        <button
                          onClick={removePromo}
                          className="text-green-600 hover:text-green-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter promo code (try: RAKHI2025 or SAVE10)"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <button
                          onClick={applyPromoCode}
                          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Summary - Right Column */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                    <h3 className="text-lg font-semibold mb-6 text-gray-800">
                      Order Summary
                    </h3>

                    {/* Price Breakdown */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span>
                          Subtotal (
                          {cartItems.reduce(
                            (sum, item) => sum + item.qty,
                            0
                          )}{" "}
                          items)
                        </span>
                        <span>₹{subtotal}</span>
                      </div>

                      {appliedPromo && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Promo Discount ({appliedPromo.code})</span>
                          <span>-₹{promoDiscount}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-sm">
                        <span>Delivery Charges</span>
                        <span
                          className={
                            deliveryCharge === 0 ? "text-green-600" : ""
                          }
                        >
                          {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                        </span>
                      </div>

                      {deliveryCharge === 0 && (
                        <div className="text-xs text-green-600 text-center">
                          🎉 You saved ₹49 on delivery!
                        </div>
                      )}
                    </div>

                    <div className="border-t border-gray-200 pt-4 mb-6">
                      <div className="flex justify-between font-bold text-xl">
                        <span>Total</span>
                        <span>₹{total}</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        You saved{" "}
                        <span>
                          ₹
                          {cartItems.reduce(
                            (sum, item) =>
                              sum +
                              ((Number(item.originalPrice) * (Number(item.qty) || 1) || 0) -
                                ((Number(item.price) || 0)) *
                                (Number(item.qty) || 1)),
                            0
                          ) +
                            (deliveryCharge === 0 ? 49 : 0) +
                            (Number(promoDiscount) || 0)}
                        </span>{" "}
                        total
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <button onClick={handleCheckOut} className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 mb-4">
                      Proceed to Checkout
                    </button>

                    {/* Trust Indicators */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Truck className="w-4 h-4 mr-2 text-green-500" />
                        Free delivery on orders above ₹500
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Shield className="w-4 h-4 mr-2 text-blue-500" />
                        100% secure payments
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
