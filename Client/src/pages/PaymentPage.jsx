import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  ShoppingBag,
  Star,
  Truck,
  Plus,
  MapPin,
  Edit2,
  CheckCircle,
  X,
  ArrowLeft,
  ShoppingCart,
  Delete,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/Button";
import { load } from "@cashfreepayments/cashfree-js";

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [savedAddresses, setSavedAddresses] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const cashfreeRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (err) {
        console.error("Invalid user data:", err);
      }
    }
  }, []);

  const location = useLocation();
  const { order } = location.state || {};

  useEffect(() => {
    const stored = localStorage.getItem("addresses");
    if (stored) {
      const parsed = JSON.parse(stored);
      setSavedAddresses(parsed);

      // Optionally restore selected address
      if (parsed.length > 0) {
        setSelectedAddress(parsed[0].id.toString());
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNewAddress = () => {
    const { name, phone, address, email } = formData;

    if (name && phone && address) {
      const newAddress = {
        id: uuidv4(), // better unique ID
        type: "New Address",
        name,
        address,
        phone,
        email,
      };

      const updatedAddresses = [...savedAddresses, newAddress];

      setSavedAddresses(updatedAddresses);
      setSelectedAddress(newAddress.id);
      setShowAddressForm(false);
      setFormData({ name: "", phone: "", email, address: "" });

      // Optional: save to localStorage
      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    } else {
      alert("Please fill all address fields.");
    }
  };

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        if (!cashfreeRef.current) {
          cashfreeRef.current = await load({
            mode: "sandbox", // or "sandbox" for testing
          });
        }
      } catch (error) {
        console.error("❌ Cashfree SDK Initialization Failed:", error);
      }
    };
    initializeSDK();
  }, []);

  const handlePayment = async () => {
    if (!selectedAddress || !paymentMethod) {
      alert("Please select delivery address and payment method.");
      return;
    }

    setIsLoading(true);

    try {
      let paymentId = null;

      const addressObj = savedAddresses.find(
        (addr) => addr.id === selectedAddress
      );

      const orderData = {
        user: user._id,
        items: order.items.map((item) => ({
          product: item._id,
          quantity: item.qty,
        })),
        totalAmount: order.totalAmount,
        address: `${addressObj.name}, ${addressObj.address}, Phone: ${addressObj.phone}`,
        paymentMethod,
        transactionId: paymentId,
      };

      // ✅ COD
      if (paymentMethod === "cod") {
        const response = await axios.post(
          "https://bandhanbliss.vercel.app/api/orders",
          orderData
        );

        if (response.data.success) {
          setShowThankYou(true);
          localStorage.removeItem("cartItems");
        } else {
          throw new Error("Order creation failed.");
        }
      }

      // ✅ Online Payment
      else {
        const ORDER_ID = `ORDER_${Date.now()}`;
        const payment = await axios.post("https://bandhanbliss.vercel.app/api/payment", {
          amount: order.totalAmount,
          userId: user._id,
          userName: user.name,
          userEmail: user.email,
          userMobile: user.phone,
          order_id: ORDER_ID,
        });
        console.log(payment.data);
        
        const orderId = payment.data.order_id;
        const paymentSessionId = payment.data.payment_session_id;
        if (!paymentSessionId) {
          throw new Error("Payment session ID not received.");
        }

        await cashfreeRef.current.checkout({
          paymentSessionId,
          redirectTarget: "_modal", //(if using _self or _blank).
        });

        // ✅ After checkout completes (modal closes), verify payment:
        const verifyRes = await axios.get(
          `https://bandhanbliss.vercel.app/api/payment/verify/${orderId}`
        );
        console.log(verifyRes.data);
        

        if (verifyRes.data.order_status === "PAID") {
          // Create order in DB now
          const response = await axios.post(
            "https://bandhanbliss.vercel.app/api/orders",
            {
              ...orderData,
              transactionId: verifyRes.data.cf_order_id,
            }
          );

          if (response.data.success) {
            setShowThankYou(true);
            localStorage.removeItem("cartItems");
          } else {
            throw new Error("Order DB entry failed.");
          }
        } else {
          alert("❌ Payment failed or not completed.");
        }
      }
    } catch (err) {
      console.error("❌ Payment Error:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const closeSuccessModal = () => {
    navigate("/products");
    setShowThankYou(false);
  };

  const handleDeleteAddress = (id) => {
    const updatedAddresses = savedAddresses.filter((addr) => addr.id !== id);

    setSavedAddresses(updatedAddresses);

    // Clear selected address if it was deleted
    if (selectedAddress === id) {
      setSelectedAddress(null);
    }

    // Optional: persist in localStorage
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="max-h-16 sticky top-0 bg-white flex items-center justify-between py-4 px-4 shadow-sm z-50">
        <div>
          {" "}
          <ArrowLeft
            className="w-6 h-6 text-gray-700"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="font-semibold text-lg text-gray-800">Payment</div>
        <div>
          <ShoppingCart className="w-6 h-6 text-gray-700" />
        </div>
      </div>

      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Success Modal Popup */}
          {showThankYou && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform">
                <div className="p-8 text-center">
                  <button
                    onClick={closeSuccessModal}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Order Placed Successfully! 🎉
                    </h3>
                    <p className="text-gray-600">
                      Your Rakhi order has been confirmed. We'll contact you
                      soon for delivery details!
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Order ID:</span>
                      <span className="font-mono text-sm font-semibold">
                        #RKH{Math.random().toString().substr(2, 8)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">
                        Total Amount:
                      </span>
                      <span className="font-semibold text-green-600">
                        ₹{order.totalAmount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Expected Delivery:
                      </span>
                      <span className="text-sm font-medium">2-4 days</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={closeSuccessModal}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                    >
                      Continue Shopping
                    </button>
                    {/* <button
                      onClick={closeSuccessModal}
                      className="w-full border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Track Your Order
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Address & Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              {/* <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">1</span>
                Contact Information
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your email for order updates"
                  required
                />
              </div>
            </div> */}

              {/* Delivery Address */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                  <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                    1
                  </span>
                  Delivery Address
                </h2>

                <div className="space-y-4">
                  {savedAddresses.map((address) => (
                    <label key={address.id} className="block">
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedAddress === address.id.toString()
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start">
                          <input
                            type="radio"
                            name="address"
                            value={address.id}
                            checked={selectedAddress === address.id.toString()}
                            onChange={(e) => setSelectedAddress(e.target.value)}
                            className="mr-3 mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                                {address.type}
                              </span>
                              <X
                                className=" bg-amber-500 rounded-full p-1 w-6 h-6 text-white"
                                onClick={() => handleDeleteAddress(address.id)}
                              />
                            </div>
                            <p className="font-medium text-gray-800">
                              {address.name}
                            </p>
                            <p className="text-gray-600 text-sm mt-1">
                              {address.address}
                            </p>
                            <p className="text-gray-600 text-sm">
                              Phone: {address.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}

                  {/* Add New Address Button */}
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-orange-500 hover:text-orange-500 transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Address
                  </button>

                  {/* New Address Form */}
                  {showAddressForm && (
                    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                      <h4 className="font-medium mb-4">Add New Address</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Full Name"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Phone Number"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Complete Address"
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-4"
                      />
                      <div className="flex space-x-3">
                        <button
                          onClick={handleAddNewAddress}
                          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          Save Address
                        </button>
                        <button
                          onClick={() => setShowAddressForm(false)}
                          className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                  <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                    2
                  </span>
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <ShoppingBag className="w-5 h-5 mr-3 text-blue-500" />
                      <div>
                        <div className="font-medium">UPI Payment</div>
                        <div className="text-sm text-gray-500">
                          GPay, PhonePe, Paytm, BHIM
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-3 text-yellow-500" />
                    <div>
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-gray-500">Visa, Mastercard, RuPay</div>
                    </div>
                  </div>
                </label> */}

                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <Truck className="w-5 h-5 mr-3 text-green-500" />
                      <div>
                        <div className="font-medium">Cash on Delivery</div>
                        <div className="text-sm text-gray-500">
                          Pay when you receive
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Order Summary
                </h3>
                {order.items.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="border-b border-gray-200 pb-4 mb-4 last:border-none"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                        <img
                          src={item.images?.[0]}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">
                          {item.name}
                        </h4>
                        {/* <p className="text-sm text-gray-500 mb-1">
                          {item.features?.[0]}
                        </p> */}
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-800">
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
                        <div className="text-sm text-gray-600 mt-1">
                          Qty: {item.qty}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Price Breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>
                      Subtotal (
                      {order.items.reduce((sum, item) => sum + item.qty, 0)}{" "}
                      items)
                    </span>
                    <span>
                      ₹
                      {order.items.reduce(
                        (sum, item) => sum + item.price * item.qty,
                        0
                      )}
                    </span>
                  </div>
                  {/* <div className="flex justify-between text-sm">
                    <span>Delivery Charges</span>
                    <span
                      className={deliveryCharge === 0 ? "text-green-600" : ""}
                    >
                      {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                    </span>
                  </div> */}
                  {(() => {
                    const actualTotal = order.items.reduce(
                      (sum, item) => sum + item.price * item.qty,
                      0
                    );

                    if (actualTotal !== order.totalAmount) {
                      return (
                        <div className="text-xs text-green-600">
                          🎉 You saved ₹{actualTotal - order.totalAmount} using
                          coupon!
                        </div>
                      );
                    }

                    return null;
                  })()}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount</span>
                    <span>₹{order.totalAmount}</span>
                  </div>
                </div>

                {/* <button
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center justify-center"
                >
                  Place Order ₹
                  {order.items.reduce(
                    (sum, item) => sum + item.price * item.qty,
                    0
                  )}
                </button> */}
                <Button
                  handleSubmit={handlePayment}
                  isProgress={isLoading}
                  text={`Place Order ₹
                  ${order.items.reduce(
                    (sum, item) => sum + item.price * item.qty,
                    0
                  )}`}
                />

                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <Truck className="w-4 h-4 mr-1" />
                    Fast Delivery • Secure Payment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
