import dbConnect from "@/lib/dbConnect";
import Nft from "../../models/Nft";
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { collection_name } = await req.body;
        console.log({ collection_name });
        const nfts = await Nft.find({
          collection_name: collection_name,
        }).populate("owner");
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
