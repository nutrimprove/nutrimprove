import mongoose from 'mongoose';

const URI = process.env.MONGODB_URI;
const mongoOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
};

const connect = (description, schema, collection) => {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(URI, mongoOptions, err => {
      if (err) {
        console.error('ERROR connecting to database!', err);
      } else {
        console.log('Succeeded connecting to database!');
      }
    });
  }
  return (
    mongoose.models[description] ||
    mongoose.model(description, schema, collection)
  );
};

export default connect;
