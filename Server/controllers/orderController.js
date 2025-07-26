const {
  createOrder,
  getAllOrders,
  updateOrder,
  getOrders
} = require('../services/orderService');
const sendConfirmEmail = require('../utils/email');

// Create Order
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

    for (const item of items) {
      if (!item.product) throw new Error("Each item must have a product ID");
      if (!item.quantity || item.quantity <= 0)
        throw new Error("Each item must have a valid quantity");
    }

    const order = await createOrder(req.body);
    console.log("✅ Order created:", order._id);

    setImmediate(async () => {
      try {
        await sendConfirmEmail({
          status: "Processed",
          email: order.user.email,
          name: order.user.name,
          items: order.items,
          total: order.totalAmount,
          paymentMethod: order.paymentMethod,
          address: order.address,
        });
        console.log("✅ Confirmation email sent successfully");
      } catch (error) {
        console.error("❌ Error sending confirmation email:", error.message);
      }
    });

    // Safe response (hide internal MongoDB IDs)
    const safeOrder = order.toObject();
    delete safeOrder.user._id;

    res.status(201).json({ success: true, order: safeOrder });

  } catch (err) {
    console.error("❌ Error creating order:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get Orders of a Specific User
const userOrderList = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const orders = await getOrders(userId);
    res.json({ success: true, orders });

  } catch (err) {
    console.error("❌ Error fetching orders for user:", req.params.id, err.message);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// Get All Orders (Admin)
const orderList = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json({ success: true, orders });
  } catch (err) {
    console.error("❌ Error fetching all orders:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Order Status
const orderUpdate = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;

    const updated = await updateOrder(orderId, req.body);

    if (status === "accepted") {
      setImmediate(async () => {
        try {
          await sendConfirmEmail({
            status: "Accepted",
            email: updated.user.email,
            name: updated.user.name,
            orderId: updated._id,
            items: updated.items,
            total: updated.totalAmount,
            paymentMethod: updated.paymentMethod,
            address: updated.address,
          });
          console.log("✅ Order accepted email sent");
        } catch (error) {
          console.error("❌ Error sending accepted email:", error.message);
        }
      });
    }

    const safeUpdate = updated.toObject();
    delete safeUpdate.user._id;

    res.json({ success: true, order: safeUpdate });

  } catch (err) {
    console.error("❌ Error updating order:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  orderCreate,
  orderList,
  orderUpdate,
  userOrderList,
};
