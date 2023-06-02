import dbConnect from "@/lib/dbConnect";
import Nft from "../../models/Nft";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const users = await Nft.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        console.log(req.body);
        let nft;
        nft = await Nft.findOne({ tokenId: req.body.tokenId });
        if (nft) return res.status(201).json({ success: true, data: nft });
        nft = await Nft.create(req.body);
        res.status(201).json({ success: true, data: nft });
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
