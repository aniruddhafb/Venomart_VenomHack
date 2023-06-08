import mongoose, { Schema } from "mongoose";

const CollectionSchema = new mongoose.Schema({
  collection_address: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  coverImage: String,
  logo: String,
  name: {
    type: String,
    unique: true,
  },
  symbol: String,
  description: String,
  nfts: [
    {
      type: Schema.Types.ObjectId,
      ref: "NFT",
    },
  ],
});

module.exports =
  mongoose.models?.Collection || mongoose.model("Collection", CollectionSchema);
