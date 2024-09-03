const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const operatingHoursSchema = new Schema({
  monday: { type: String, required: true },
  tuesday: { type: String, required: true },
  wednesday: { type: String, required: true },
  thursday: { type: String, required: true },
  friday: { type: String, required: true },
  saturday: { type: String, required: true },
  sunday: { type: String, required: true }
});

const locationSchema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
});

const shopkeeperSchema = new Schema({
  shopName: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  contactEmail: { type: String, required: true, unique: true },
  contactPhone: { type: String, required: true },
  address: { type: String, required: true },
  operatingHours: { type: operatingHoursSchema, required: true },
  ownerName: { type: String, required: true },
  ownerEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ownerPhone: { type: String, required: true },
  location: { type: locationSchema, required: true },
  logo: { type: String, required: true },
  documents: [{ type: String, required: true }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Shopkeeper || mongoose.model('Shopkeeper', shopkeeperSchema);
