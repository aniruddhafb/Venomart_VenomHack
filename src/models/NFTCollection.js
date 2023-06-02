import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
  collection_address: String,
  // owner: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  // },
  coverImage: String,
  logo: String,
  name: String,
  symbol: String,
  description: String,
  nfts: [String],
});

module.exports =
  mongoose.models?.Collection || mongoose.model("Collection", CollectionSchema);
