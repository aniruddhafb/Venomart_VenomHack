import mongoose, { Schema } from "mongoose";

const CollectionSchema = new mongoose.Schema({
  id: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  coverImage: String,
  logo: String,
  name: String,
  symbol: String,
  description: String,
  chain_image: String,
  chain_block: String,
  isStarted: Boolean,
  isRequested: Boolean,
  isSettled: Boolean,
  isCollectionVerified: Boolean,
  uma_contract: String,
  nfts: [
    {
      type: Schema.Types.ObjectId,
      ref: "NFT",
    },
  ],
});
