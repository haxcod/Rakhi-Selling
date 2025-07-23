const Order = require('../model/orderModel');

// CREATE
const createOrder = async (data) => {
  try {
    const order = await Order.create(data);
    return order;
  } catch (error) {
    console.error("Error creating order:", error.message);
    throw new Error("Failed to create order");
  }
};

// GET ALL
const getAllOrders = async () => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
      .populate('user')
      .populate('items.product');
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    throw new Error("Failed to fetch orders");
  }
};

const getOrders = async (userID) => {
  try {
    const orders = await Order.find({ user: userID })
      .sort({ createdAt: -1 })
      .select('status totalAmount address paymentMethod createdAt')
      .lean();

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    throw new Error("Failed to fetch orders");
  }
};


// UPDATE
const updateOrder = async (id, data) => {
  try {
    const updated = await Order.findByIdAndUpdate(id, data, { new: true })
      .populate("user", "email name")
      .populate("items.product", "name price");

    if (!updated) throw new Error("Order not found");
    return updated;
  } catch (error) {
    console.error("Error updating order:", error.message);
    throw new Error("Failed to update order");
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  updateOrder,
  getOrders
};
