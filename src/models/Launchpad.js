import mongoose, { Schema } from "mongoose";

const Launchpad = new mongoose.Schema({
  logo: String,
  coverImage: String,
  name: String,
  description: String,
  address: String,
  max_supply: String,
  mint_price: String,
  json: String,
  start_date: String,
  email: String,
  isActive: Boolean,
});

module.exports =
  mongoose.models.Launchpad || mongoose.model("Launchpad", Launchpad);
