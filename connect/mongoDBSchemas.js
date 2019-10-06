import mongoose from 'mongoose';

const searchTermSchema = new mongoose.Schema(
  {
    search_term: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    matches: [
      {
        food_name: {
          type: String,
          required: true,
        },
        food_id: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const recommendationsSchema = new mongoose.Schema([
  {
    food: {
      id: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
      },
      name: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
      },
    },
    recommendation: {
      id: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
      },
      name: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
      },
    },
    contributor_id: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
  },
]);

const userSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

export { searchTermSchema, recommendationsSchema, userSchema };
