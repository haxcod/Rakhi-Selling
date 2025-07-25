const axios = require("axios");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// ✅ Create Payment Controller
const createPayment = async (req, res) => {
  try {
    const { amount, userId, userName, userEmail, userMobile, order_id } = req.body;

    if (!amount || !userId || !userName || !userEmail || !userMobile || !order_id) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Call service
    const response = await axios.post(
      "https://api.cashfree.com/pg/orders",
      {
        order_id,
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: userId,
          customer_email: userEmail,
          customer_phone: userMobile,
          customer_name: userName,
        },
        order_note: "Bandhan Bliss Order",
        order_meta: {
          return_url: `https://bandhanbliss.shop/payment-status?order_id=${order_id}`,
        },
      },
      {
        headers: {
          "x-client-id": CLIENT_ID,
          "x-client-secret": CLIENT_SECRET,
          "x-api-version": "2023-08-01",
        },
      }
    );
    const { payment_session_id } = response.data;
    if (!payment_session_id) {
      return res.status(400).json({ success: false, error: "Invalid response from Cashfree" });
    }
    res.status(200).json({ success: true, order_id, payment_session_id });

  } catch (error) {
  console.error("❌ Error in creating payment:");
  if (error.response) {
    console.error("Status:", error.response.status);
    console.error("Data:", error.response.data);
    console.error("Headers:", error.response.headers);
  } else {
    console.error("Error Message:", error.message);
  }
  res.status(401).json({
    success: false,
    message: "Payment creation failed",
    error: error.response?.data || error.message,
  });
}
}

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
    const response = await axios.get(`https://api.cashfree.com/pg/orders/${orderId}`, {
      headers: {
        'x-client-id': process.env.CLIENT_ID,
        'x-client-secret': process.env.CLIENT_SECRET,
        'x-api-version': '2023-08-01',
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('❌ Error verifying payment:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
};

module.exports = {
  createPayment,
  verifyPayment,
};
