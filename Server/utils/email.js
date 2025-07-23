const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendConfirmEmail = async ({ email, name, orderId, items, total, paymentMethod, address }) => {
    // Build the HTML rows dynamically from items
    const itemRows = items.map((item) => {
        return `
      <tr>
        <td style="padding: 8px;">${item.product.name}</td>
        <td style="text-align: center; padding: 8px;">${item.quantity}</td>
        <td style="text-align: right; padding: 8px;">₹${item.product.price}</td>
      </tr>
    `;
    }).join("");

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "🎉 Your RakhiStore Order Has Been Accepted!",
        html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #4CAF50;">Thank you for your order!</h2>

        <p>Hello <strong>${name}</strong>,</p>

        <p>Your order <strong>#${orderId}</strong> has been received and is being processed.</p>

        <h3 style="margin-bottom: 5px;">🛍️ Order Summary:</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr>
              <th style="text-align: left; padding: 8px; background: #f0f0f0;">Item</th>
              <th style="text-align: center; padding: 8px; background: #f0f0f0;">Qty</th>
              <th style="text-align: right; padding: 8px; background: #f0f0f0;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
        </table>

        <p style="margin-top: 15px;"><strong>Total Paid:</strong> ₹${total}</p>
        <p><strong>Payment Method:</strong> ${paymentMethod}</p>

        <h4>📍 Shipping Address:</h4>
        <p>${address.replace(/\n/g, "<br>")}</p>

        <p>We will notify you once your order is shipped.</p>

        <p style="margin-top: 20px;">Thank you for shopping with us!</p>
        <p>~ Team RakhiStore</p>
      </div>
    `,
    };

    try {
        // Verify SMTP connection first
        await transporter.verify();
        console.log("✅ SMTP Server is ready to send messages");

        // Send email
        await transporter.sendMail(mailOptions);
        console.log("✅ Order confirmation email sent");
    } catch (error) {
        console.error("❌ Email Error:", error.message);
        throw new Error("Failed to send order confirmation email.");
    }

};

module.exports = sendConfirmEmail;
