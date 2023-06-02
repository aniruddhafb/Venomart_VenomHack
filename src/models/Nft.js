import mongoose, { Schema } from "mongoose";

const NFTSchema = new mongoose.Schema({
  id: String,
  tokenId: String,
  chainId: String,
  ipfsURL: String,
  listingPrice: String,
  isListed: Boolean,
  owner: String,
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  properties: String,
  nft_name: String,
  chain_image: String,
  chain_block: String,
  chain_symbol: String,
});

module.exports = mongoose.models.NFT || mongoose.model("NFT", NFTSchema);
