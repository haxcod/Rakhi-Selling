const { cashFreePayment, cashFreeVerify } = require("../services/paymentService");

// ✅ Create Payment Controller
const createPayment = async (req, res) => {
  try {
    const { amount, userId, userName, userEmail, userMobile } = req.body;

    if (!amount || !userId || !userName || !userEmail || !userMobile) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Call service
    const response = await cashFreePayment(amount, userMobile, userName, userEmail, userId);

    return res.status(200).json({
      success: true,
      message: "Payment initiated successfully",
      data: response,
    });
  } catch (err) {
    console.error("❌ Error in creating payment:", err.message);
    return res.status(500).json({
      success: false,
      message: "Payment creation failed",
      error: err.message,
    });
  }
};

// ✅ Verify Payment Controller
const verifyPayment = async (req, res) => {
  const { orderId } = req.params;

  if (!orderId) {
    return res.status(400).json({
      success: false,
      message: "Missing orderId in request",
    });
  }

  try {
    const status = await cashFreeVerify(orderId);

    return res.status(200).json({
      success: true,
      message: "Payment status fetched",
      data: status,
    });
  } catch (err) {
    console.error("❌ Payment verification failed:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to verify payment",
      error: err.message,
    });
  }
};

module.exports = {
  createPayment,
  verifyPayment,
};
