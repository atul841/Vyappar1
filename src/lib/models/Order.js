const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  delivery_id: { type: Schema.Types.ObjectId, ref: 'DeliveryPersonnel', required: true },
  status: { type: String, enum: ['pending', 'picked up', 'delivered'], default: 'pending' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
