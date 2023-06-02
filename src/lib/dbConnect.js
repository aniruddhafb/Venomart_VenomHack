import mongoose from "mongoose";

const mongodb_uri = process.env.NEXT_PUBLIC_Mongo_URI;
// const mongodb_uri = "mongodb://localhost:27017";

if (!mongodb_uri) {
  throw new error("missing uri");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // bufferCommands: false,
      // bufferMaxEntries: 0,
      // useFindAndModify: true,
      // useCreateIndex: true,
    };
    cached.promise = mongoose.connect(mongodb_uri, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
