const { Cashfree } = require('cashfree-pg');


const cashfree = new Cashfree(
  Cashfree.SANDBOX,
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);
// ✅ Generate unique Order ID
const generateOrderId = () => "ORD" + Date.now();

// ✅ Create a new Cashfree order
const cashFreePayment = async (amount, userMobile, userName, userEmail, userId) => {
  try {
    const orderId = generateOrderId();

    const request = {
      order_id: orderId,
      order_amount: Number(amount),
      order_currency: "INR",
      customer_details: {
        customer_id: String(userId),
        customer_name: String(userName),
        customer_email: String(userEmail),
        customer_phone: String(userMobile),
      },
      order_meta: {
        return_url: `https://bandhanbliss.shop/payment-status?order_id=${orderId}`, // ✅ Redirect after payment
      },
      order_note: "Rakhi Store Order",
    };

    const response = cashfree.PGCreateOrder(request);
    console.log("💬 Raw Cashfree response:", response);
    

    if (!response || !response.payment_session_id) {
      throw new Error("Invalid response from Cashfree");
    }

    console.log("✅ Cashfree order created:", orderId);
    return {
      orderId,
      ...response,
    };
  } catch (err) {
    console.error("❌ Payment creation error:", err.message);
    throw err;
  }
};

// ✅ Verify Cashfree payment status
const cashFreeVerify = async (orderId) => {
  try {
    const response = await cashfree.PGFetchOrder(orderId);

    if (!response || !response.order_status) {
      throw new Error("Invalid response during verification");
    }

    if (response.order_status === "PAID") {
      console.log("✅ Payment verified for order:", orderId);
    } else {
      console.warn("⚠️ Payment not successful. Status:", response.order_status);
    }

    return response;
  } catch (err) {
    console.error("❌ Error verifying payment:", err.message);
    throw new Error("Failed to verify payment. Please try again later.");
  }
};

module.exports = { cashFreePayment, cashFreeVerify };
