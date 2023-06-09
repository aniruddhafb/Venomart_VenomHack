import dbConnect from "@/lib/dbConnect";
import Launchpad from "../../models/Launchpad";
import Nft from "../../models/Nft";
import User from "../../models/User";
import NFTCollection from "../../models/NFTCollection";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const nfts = await Launchpad.find({});
        res.status(200).json({ success: true, data: nfts });
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
      }
      break;
    case "POST":
      try {
        const {
          logo,
          coverImage,
          name,
          description,
          address,
          max_supply,
          mint_price,
          json,
          start_date,
          email,
          isActive,
        } = req.body;

        const launchpad = await Launchpad.create({
          logo,
          coverImage,
          name,
          description,
          address,
          max_supply,
          mint_price,
          json,
          start_date,
          email,
          isActive,
        });

        res.status(200).json({ success: true, data: launchpad });
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
