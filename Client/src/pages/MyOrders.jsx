import { useEffect, useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
} from "lucide-react";
import Navbar from "../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyOrdersPage = () => {
  // Sample orders data - in a real app, this would come from an API
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("all");

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-100";
      case "accepted":
        return "text-blue-600 bg-blue-100";
      case "Pending":
        return "text-orange-600 bg-orange-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "accepted":
        return <Truck className="w-4 h-4" />;
      case "Pending":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <Package className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        navigate("/auth"); // ✅ Redirect to login if no user
        return;
      }

      let userId;
      try {
        const parsedUser = JSON.parse(storedUser);
        userId = parsedUser._id;
        if (!userId) {
          navigate("/auth"); // ✅ Redirect if _id is missing
          return;
        }
      } catch (e) {
        console.error("Invalid user data in localStorage");
        navigate("/auth"); // ✅ Redirect if JSON is bad
        return;
      }
      try {
        const res = await axios.get(
          `https://bandhanbliss.vercel.app/api/orders/user/${userId}`
        );
        setOrders(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const filterOrders = (status) => {
    if (status === "all") return orders;
    return orders.filter((order) => order.status === status);
  };

  const OrderCard = ({ order }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header with Order Number and Status */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-[12px] uppercase text-gray-400">
            Order ID: <br />{order._id}
          </h3>
          <br />
          <p className="text-sm text-gray-600">
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(
            order.status
          )}`}
        >
          {getStatusIcon(order.status)}
          <span className="capitalize">{order.status}</span>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-blue-50 p-3 rounded-lg mb-4">
        <p className="text-sm text-gray-600 mb-2">Items Ordered:</p>
        <div className="text-sm text-gray-800">
          <span>
            {order.items.map((item, index) => (
              <span key={item._id}>
                {item.product?.name} (Qty: {item.quantity})
                {index < order.items.length - 1 && <br />}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Order Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Amount */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total Amount</p>
          <p className="font-bold text-xl text-gray-800">
            ₹{order.totalAmount}
          </p>
        </div>

        {/* Payment Method */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Payment Method</p>
          <div className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4 text-blue-500" />
            <p className="font-medium text-gray-800">
              {order.paymentMethod === "upi"
                ? "Online Payment"
                : "Cash on Delivery"}
            </p>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-gray-50 p-3 rounded-lg md:col-span-2 lg:col-span-1">
          <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
            <p className="font-medium text-gray-800 text-sm leading-5">
              {order.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <Package className="w-6 h-6 mr-3 text-orange-500" />
            My Orders
          </h1>
          <p className="text-gray-600 mt-1">Track and manage your rakhi orders</p>
        </div>
      </div> */}
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: "All Orders", count: orders.length },
              {
                key: "Pending",
                label: "Processing",
                count: orders.filter((o) => o.status === "processing").length,
              },
              //   { key: "shipped", label: "Shipped", count: orders.filter(o => o.status === "shipped").length },
              //   { key: "delivered", label: "Delivered", count: orders.filter(o => o.status === "delivered").length },
              {
                key: "cancelled",
                label: "Cancelled",
                count: orders.filter((o) => o.status === "cancelled").length,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filterOrders(activeTab).length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No orders found
              </h3>
              <p className="text-gray-600 mb-6">
                {activeTab === "all"
                  ? "You haven't placed any orders yet. Start shopping for beautiful rakhis!"
                  : `No ${activeTab} orders found.`}
              </p>
              {activeTab === "all" && (
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all">
                  Start Shopping
                </button>
              )}
            </div>
          ) : (
            filterOrders(activeTab).map((order) => (
              <OrderCard key={order._id} order={order} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
