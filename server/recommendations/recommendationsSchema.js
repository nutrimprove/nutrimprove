import mongoose from 'mongoose';

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
    contributors: [
      {
        id: {
          type: String,
          lowercase: true,
          trim: true,
        },
        added_on: {
          type: Number,
          required: false,
        },
        _id: false,
      },
    ],
    timestamp: {
      type: Number,
      required: true,
    },
  },
]);

export default recommendationsSchema;
