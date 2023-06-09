import dbConnect from "@/lib/dbConnect";
import Nft from "../../models/Nft";
import User from "../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { signer_address, tokenId, listingPrice } = req.body;
        const user = await User.findOne({ wallet_id: signer_address });
        const nft = await Nft.findOne({ owner: user, tokenId });
        if (!nft)
          return res.status(400).json({
            success: false,
            data: "You are not the owner of this nft",
          });
        nft.isListed = true;
        nft.listingPrice = listingPrice;
        await nft.save();
        res.status(200).json({ success: true, data: nft });
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
