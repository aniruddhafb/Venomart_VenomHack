import dbConnect from "@/lib/dbConnect";
import Nft from "../../models/Nft";
import User from "../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const users = await Nft.find({}).populate("owner");
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
        let user = await User.findOne({ wallet_id: req.body.owner });
        console.log({ user });
        if (!user)
          return res
            .status(400)
            .json({ success: false, data: "Cannot Find The Owner" });
        if (nft) return res.status(201).json({ success: true, data: nft });
        nft = await Nft.create({ ...req.body, owner: user });
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
