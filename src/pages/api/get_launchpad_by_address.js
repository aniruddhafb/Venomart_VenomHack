import dbConnect from "@/lib/dbConnect";
import Launchpad from "../../models/Launchpad";
import Nft from "../../models/Nft";
import User from "../../models/User";
import NFTCollection from "../../models/NFTCollection";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { address } = req.body;
        const launchpad = await Launchpad.findOne({ address });
        if (!launchpad)
          return res
            .status(400)
            .json({ success: false, data: "Cannot find the launchpad" });
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
