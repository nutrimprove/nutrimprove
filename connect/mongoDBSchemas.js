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
        food_brand: {
          type: String,
          required: false,
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
      brand: {
        type: String,
        required: false,
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
      brand: {
        type: String,
        required: false,
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

export { searchTermSchema, recommendationsSchema };
