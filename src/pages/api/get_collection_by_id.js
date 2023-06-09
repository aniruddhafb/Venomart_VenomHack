import dbConnect from "@/lib/dbConnect";
import Collection from "../../models/NFTCollection";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { collection_id } = req.body;
        const collection = await Collection.findById(collection_id).populate(
          "owner"
        );
        return res.status(200).json({ success: true, data: collection });
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
