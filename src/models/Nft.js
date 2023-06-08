import mongoose, { Schema } from "mongoose";

const NFTSchema = new mongoose.Schema({
  tokenId: String,
  nft_collection: {
    type: Schema.Types.ObjectId,
    ref: "Collection",
  },
  collection_name: String,
  json: String,
  listingPrice: {
    type: String,
    default: "0",
  },
  isListed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.models.NFT || mongoose.model("NFT", NFTSchema);
