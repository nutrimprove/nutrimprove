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

const recommendationsSchema = new mongoose.Schema(
  {
    food_id: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    recommendation_id: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    contributor_id: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

export { searchTermSchema, recommendationsSchema };
