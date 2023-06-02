import mongoose from "mongoose";

const NFTSchema = new mongoose.Schema({
  tokenId: String,
  nft_collection: String,
  ipfsURL: String,
  listingPrice: String,
  isListed: Boolean,
  owner: String,
});

module.exports = mongoose.models.NFT || mongoose.model("NFT", NFTSchema);
