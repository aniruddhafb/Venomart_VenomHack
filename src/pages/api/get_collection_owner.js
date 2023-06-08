import dbConnect from "@/lib/dbConnect";
import Collection from "../../models/NFTCollection";
import User from "../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { wallet_address } = req.body;
        const user = await User.findOne({ wallet_id: wallet_address });
        const collections = await Collection.find({
          owner: user,
        });
        return res.status(200).json({ success: true, data: collections });
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
