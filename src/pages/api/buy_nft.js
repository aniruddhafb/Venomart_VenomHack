import dbConnect from "@/lib/dbConnect";
import Nft from "../../models/Nft";
import User from "../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { tokenId, buyer_address } = req.body;
        const nft = await Nft.findOne({ tokenId });
        if (!nft)
          return res
            .status(400)
            .json({ success: false, data: "Cannot find the nft" });

        const buyer = await User.findOne({ wallet_id: buyer_address });
        nft.owner = buyer;
        nft.isListed = false;
        nft.listingPrice = "0";
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
