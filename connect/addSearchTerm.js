import mongoose from 'mongoose';

const URI = process.env.MONGODB_URI;

const searchTermSchema = new mongoose.Schema(
  {
    search_term: {
      type: String,
      lowercase: true,
      trim: true,
    },
    matches: [
      {
        food_name: String,
        food_id: String,
      },
    ],
  },
  { timestamps: true }
);

const addSearchTerm = searchTerm => {
  // Connect to mongoDB using mongoose
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(URI, function(err, res) {
      if (err) {
        console.log(`ERROR connecting to: ${URI}. ${err}`);
      } else {
        console.log(`Succeeded connected to: ${URI}`);
      }
    });
  }

  // Set new search term based on a schema
  const SearchTerm = mongoose.model('SearchTerm', searchTermSchema);
  const newSearchTerm = new SearchTerm(searchTerm);

  // Save search term document to DB
  return newSearchTerm.save(err => {
    if (err) console.error(`Error saving '${searchTerm}'`);
  });
};

export { addSearchTerm };
