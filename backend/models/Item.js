import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  { _id: false }
);

const itemSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['clothes', 'jewellery', 'accessories', 'watch', 'shoes'], required: true },
    images: [{ type: String }],
    rentPricePerDay: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, min: 0 },
    depositAmount: { type: Number, default: 0, min: 0 },
    location: { type: locationSchema, required: true }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export default mongoose.model('Item', itemSchema);


