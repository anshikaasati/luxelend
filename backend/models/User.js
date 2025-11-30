import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    phone: { type: String },
    avatarUrl: { type: String }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export default mongoose.model('User', userSchema);


