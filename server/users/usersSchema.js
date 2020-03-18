import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    role: {
      type: Number,
      required: true,
    },
    approved: {
      type: Boolean,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default usersSchema;
