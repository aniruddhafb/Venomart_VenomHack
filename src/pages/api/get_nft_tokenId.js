import dbConnect from "@/lib/dbConnect";
import Nft from "../../models/Nft";
import User from "../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { tokenId } = await req.body;
        const nfts = await Nft.find({ tokenId }).populate("owner");
        return res.status(200).json({ success: true, data: nfts });
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
