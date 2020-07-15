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
    preferences: {
      type: Array,
      required: false,
    },
    lists: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true },
);

export default usersSchema;
