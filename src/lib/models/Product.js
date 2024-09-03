import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  shopkeeper_id: { type: Schema.Types.ObjectId, ref: 'Shopkeeper', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default model('Product', productSchema);
