import React, { useCallback, useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Package,
  ShoppingCart,
  FileText,
  Eye,
  Check,
  X,
  AlertTriangle,
  Loader,
} from "lucide-react";
import axios from "axios";
import LoadingBar from "../components/LoadingBar";
import { generateInvoice } from "../hooks/InvoicePdf";

const AdminPanel = () => {
  // Initial product data
  const [products, setProducts] = useState([]);

  const [activeTab, setActiveTab] = useState("products");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [productLoading, setProductLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(true);
  const [productDeleteLoading, setProductDeleteLoading] = useState(false);
  const [productCreateLoading, setProductCreateLoading] = useState(false);
  const [productStockLoading, setProductStockLoading] = useState(false);
  const [orders, setOrders] = useState();

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    originalPrice: "",
    images: [""],
    offer: "",
    description: "",
    features: [""],
    material: "",
    size: "",
    stock: "",
    category: "",
  });

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get("https://bandhanbliss.vercel.app/api/products");
      setProducts(response.data.products);
      setProductLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error.message);
    } finally {
      setProductLoading(false);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get("https://bandhanbliss.vercel.app/api/orders");
      // setProducts(response.data.orders);
      const formatted = formatOrders(response.data.orders || []); // <--- convert raw to UI-friendly
      setOrders(formatted);
      // setOrderLoading(false);
      console.log(response.data.orders);
    } catch (error) {
      console.error("Failed to fetch order:", error.message);
    } finally {
      setOrderLoading(false);
    }
  }, []);

  const formatOrders = (rawOrders) => {
    return rawOrders.map((order, index) => ({
      _id: order._id,
      id: `ORD${index + 1}`.padStart(6, "0"), // Or use order._id
      customerName: order.user?.name || "Unknown",
      email: order.user?.email || "",
      phone: order.user?.phone || "",
      address: order.address,
      items: order.items.map((item) => ({
        productId: item.product?._id || index + 1,
        productName: item.product?.name || "Unnamed Product",
        quantity: item.quantity,
        price: item.product?.price || 0,
      })),
      total: order.totalAmount,
      status: order.status?.toLowerCase() || "pending",
      orderDate: new Date(order.createdAt).toISOString().split("T")[0],
      deliveryDate: "", // You can compute or assign this separately
    }));
  };

  const handleAddProduct = useCallback(async () => {
    if (newProduct.name && newProduct.price) {
      setProductCreateLoading(true);
      const product = {
        ...newProduct,
        id: Date.now(),
        price: parseInt(newProduct.price),
        originalPrice: parseInt(newProduct.originalPrice),
        stock: parseInt(newProduct.stock),
        status: "active",
        features: newProduct.features.filter((f) => f.trim() !== ""),
        images: newProduct.images.filter((img) => img.trim() !== ""),
        rating: parseFloat((Math.random() * (4.6 - 3.5) + 3.5).toFixed(1)),
        reviews: Math.floor(Math.random() * (500 - 60 + 1)) + 60,
      };
      try {
        await axios.post("https://bandhanbliss.vercel.app/api/products", product);
        alert("Product Created");
      } catch (error) {
        console.error("Failed to add product:", error);
        alert("Failed to add product:", error);
      } finally {
        setNewProduct({
          name: "",
          price: "",
          originalPrice: "",
          image: "",
          offer: "",
          description: "",
          features: [""],
          material: "",
          size: "",
          stock: "",
        });
        setShowAddProduct(false);
        setProductCreateLoading(false);
      }
    }
  }, [newProduct]);

  // Delete product
  const handleDeleteProduct = useCallback(
    async (id) => {
      const confirmed = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmed) return;
      setProductDeleteLoading(true);
      try {
        await axios.delete(`https://bandhanbliss.vercel.app/api/products/${id}`);
        setProducts(products.filter((p) => p._id !== id));
      } catch (error) {
        console.error("Failed to delete product:", error.message);
      } finally {
        setProductDeleteLoading(false);
      }
    },
    [products]
  );

  // Toggle stock status
  const toggleStockStatus = async (id, currentStock) => {
    setProductStockLoading(true);

    try {
      const newStock =
        currentStock === 0 ? Math.floor(Math.random() * 16) + 5 : 0;
      await axios.patch(`https://bandhanbliss.vercel.app/api/products/${id}`, {
        stock: newStock,
      });
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id ? { ...product, stock: newStock } : product
        )
      );
    } catch (err) {
      console.log(err);
    } finally {
      setProductStockLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "products") {
      fetchProducts();
    }
    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab, fetchProducts, fetchOrders]);

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      // Send update request to backend
      const res = await axios.patch(
        `https://bandhanbliss.vercel.app/api/orders/${orderId}`,
        { status }
      );
      console.log(res);
      console.log(orders);

      // On success, update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "accepted" } : order
        )
      );
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Failed to update order status");
    }
  };

  const handleDownload = async (order) => {
    await generateInvoice(order); // ✅ Correct usage
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Rakhi Store Admin
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab("products")}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  activeTab === "products"
                    ? "bg-orange-100 text-orange-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Package size={20} />
                <span>Products</span>
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  activeTab === "orders"
                    ? "bg-orange-100 text-orange-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <ShoppingCart size={20} />
                <span>Orders</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Product Management
              </h2>
              <button
                onClick={() => setShowAddProduct(true)}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-700"
              >
                <Plus size={20} />
                <span>Add Product</span>
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {product.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          product.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock !== 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      ₹{product.price}
                      <span className="line-through text-gray-400 ml-2">
                        ₹{product.originalPrice}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      Stock: {product.stock} units
                    </p>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 flex items-center justify-center space-x-1"
                      >
                        <Edit size={16} />
                        <span>Edit</span>
                      </button>
                      <button
                        disabled={productStockLoading}
                        onClick={() =>
                          toggleStockStatus(product._id, product.stock)
                        }
                        className={`flex-1 px-3 py-2 rounded text-sm flex items-center justify-center space-x-1 ${
                          product.status === 0
                            ? "bg-yellow-600 text-white hover:bg-yellow-700"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        <AlertTriangle size={16} />
                        <span>
                          {productStockLoading
                            ? "Waiting.."
                            : product.stock === 0
                            ? "Out Stock"
                            : "In Stock"}
                        </span>
                      </button>
                      <button
                        disabled={productDeleteLoading}
                        onClick={() => handleDeleteProduct(product._id)}
                        className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 flex items-center justify-center"
                      >
                        {productDeleteLoading ? (
                          <Loader size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Order Management
            </h2>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders?.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{order.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.orderDate}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-sm font-medium flex justify-between">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:text-blue-900 inline-flex items-center space-x-1"
                        >
                          <Eye size={16} />
                          <span>View</span>
                        </button>
                        {order.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                updateOrderStatus(order._id, "accepted")
                              }
                              className="text-green-600 hover:text-green-900 inline-flex items-center space-x-1"
                            >
                              <Check size={16} />
                              <span>Accept</span>
                            </button>
                            <button
                              onClick={() =>
                                updateOrderStatus(order._id, "rejected")
                              }
                              className="text-red-600 hover:text-red-900 inline-flex items-center space-x-1"
                            >
                              <X size={16} />
                              <span>Reject</span>
                            </button>
                          </>
                        )}
                        {order.status === "accepted" && (
                          <button
                            onClick={() => handleDownload(order)}
                            className="text-purple-600 hover:text-purple-900 inline-flex items-center space-x-1"
                          >
                            <FileText size={16} />
                            <span>Invoice</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    className="border rounded-lg px-3 py-2"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    className="border rounded-lg px-3 py-2"
                  />
                  <input
                    type="number"
                    placeholder="Original Price"
                    value={newProduct.originalPrice}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        originalPrice: e.target.value,
                      })
                    }
                    className="border rounded-lg px-3 py-2"
                  />
                  <input
                    type="number"
                    placeholder="Stock Quantity"
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, stock: e.target.value })
                    }
                    className="border rounded-lg px-3 py-2"
                  />
                  <div></div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        category: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="">Select Category</option>
                    <option value="TraditionalRakhi">Traditional Rakhi</option>
                    <option value="GoldRakhi">Gold Rakhi</option>
                    <option value="KundanPearlRakhi">Kundan Pearl Rakhi</option>
                    <option value="ComboPack">Combo Pack</option>
                    <option value="KidsRakhi">Kids Rakhi</option>
                    <option value="SilverRakhi">Silver Rakhi</option>
                  </select>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images (URLs)
                  </label>
                  {newProduct?.images?.map((img, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <input
                        type="url"
                        placeholder={`Image URL ${index + 1}`}
                        value={img}
                        onChange={(e) => {
                          const updatedImages = [...newProduct.images];
                          updatedImages[index] = e.target.value;
                          setNewProduct({
                            ...newProduct,
                            images: updatedImages,
                          });
                        }}
                        className="flex-1 border rounded-lg px-3 py-2"
                      />
                      {newProduct.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updatedImages = newProduct.images.filter(
                              (_, i) => i !== index
                            );
                            setNewProduct({
                              ...newProduct,
                              images: updatedImages,
                            });
                          }}
                          className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setNewProduct({
                        ...newProduct,
                        images: [...newProduct.images, ""],
                      })
                    }
                    className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-1"
                  >
                    <Plus size={16} />
                    <span>Add Image</span>
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Offer Tag"
                  value={newProduct.offer}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, offer: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
                <textarea
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2 h-20"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  {newProduct.features.map((feature, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        placeholder={`Feature ${index + 1}`}
                        value={feature}
                        onChange={(e) => {
                          const updatedFeatures = [...newProduct.features];
                          updatedFeatures[index] = e.target.value;
                          setNewProduct({
                            ...newProduct,
                            features: updatedFeatures,
                          });
                        }}
                        className="flex-1 border rounded-lg px-3 py-2"
                      />
                      {newProduct.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updatedFeatures = newProduct.features.filter(
                              (_, i) => i !== index
                            );
                            setNewProduct({
                              ...newProduct,
                              features: updatedFeatures,
                            });
                          }}
                          className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setNewProduct({
                        ...newProduct,
                        features: [...newProduct.features, ""],
                      })
                    }
                    className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-1"
                  >
                    <Plus size={16} />
                    <span>Add Feature</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Material"
                    value={newProduct.material}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, material: e.target.value })
                    }
                    className="border rounded-lg px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Size"
                    value={newProduct.size}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, size: e.target.value })
                    }
                    className="border rounded-lg px-3 py-2"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    disabled={productCreateLoading}
                    type="button"
                    onClick={handleAddProduct}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                  >
                    {productCreateLoading ? "wait.." : "Add Product"}
                  </button>
                  <button
                    disabled={productCreateLoading}
                    type="button"
                    onClick={() => setShowAddProduct(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Order Details - {selectedOrder.id}
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Customer Information</h4>
                  <p>Name: {selectedOrder.customerName}</p>
                  <p>Email: {selectedOrder.email}</p>
                  <p>Phone: {selectedOrder.phone}</p>
                  <p>Address: {selectedOrder.address}</p>
                </div>
                <div>
                  <h4 className="font-medium">Order Items</h4>
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between py-1">
                      <span>
                        {item.productName} x{item.quantity}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 font-semibold">
                    Total: ₹{selectedOrder.total}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {productLoading && <LoadingBar />}
    </div>
  );
};

export default AdminPanel;
