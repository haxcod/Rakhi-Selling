const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  transactionId: { type: String },
  status: { type: String, default: 'Pending' }, // e.g., Pending, Shipped, Delivered
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
