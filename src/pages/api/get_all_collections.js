import dbConnect from "@/lib/dbConnect";
import Collection from "../../models/NFTCollection";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const collections = await Collection.find().populate("owner");
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
