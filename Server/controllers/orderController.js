const {
  createOrder,
  getAllOrders,
  updateOrder,
  getOrders
} = require('../services/orderService');
const sendConfirmEmail = require('../utils/email');

// Create
const orderCreate = async (req, res) => {
  try {
    const { user, items, totalAmount, address, paymentMethod } = req.body;


    // Basic validations
    if (!user) throw new Error("User ID is required");
    if (!Array.isArray(items) || items.length === 0)
      throw new Error("At least one item is required");
    if (!totalAmount || typeof totalAmount !== "number")
      throw new Error("Valid total amount is required");
    if (!address || typeof address !== "string")
      throw new Error("Address is required");
    if (!paymentMethod) throw new Error("Payment method is required");

    // Optional: validate each item
    for (const item of items) {
      if (!item.product) throw new Error("Each item must have a product ID");
      if (!item.quantity || item.quantity <= 0)
        throw new Error("Each item must have a valid quantity");
    }

    const order = await createOrder(req.body);
    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const userOrderList = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const orders = await getOrders(userId);
    res.json(orders);
    
  } catch (err) {
    console.error("Error fetching orders:", err.message);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};


// Get all
const orderList = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update
const orderUpdate = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await updateOrder(req.params.id, req.body);
    if (status === "accepted") {
      console.log(updated);

      process.nextTick(async () => {
        try {
          await sendConfirmEmail({
            email: updated.user.email,
            name: updated.user.name,
            orderId: updated._id,
            items: updated.items,
            total: updated.totalAmount,
            paymentMethod: updated.paymentMethod,
            address: updated.address,
          });


          console.log("✅  sent successfully");
        } catch (error) {
          console.error("❌ Error sending:", error.message);
        }
      });
    }
    res.json({ success: true, order: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};




module.exports = {
  orderCreate,
  orderList,
  orderUpdate,
  userOrderList,
};
