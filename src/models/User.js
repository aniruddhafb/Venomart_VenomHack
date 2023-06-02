import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  wallet_id: String,
  user_name: {
    type: String,
    sparse: true,
  },
  email: {
    type: String,
    sparse: true,
  },
  bio: {
    type: String,
    sparse: true,
  },
  profileImage: {
    type: String,
    sparse: true,
  },
  coverImage: {
    type: String,
    sparse: true,
  },
  socials: [String],
  nftCollections: [String],
  transactions: [String],
});

module.exports = mongoose.models?.User || mongoose.model("User", UserSchema);
