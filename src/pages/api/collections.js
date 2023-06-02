import dbConnect from "@/lib/dbConnect";
import Collection from "../../models/NFTCollection";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const collections = await Collection.find({});
        res.status(200).json({ success: true, data: collections });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        console.log(req.body);
        let collection;
        collection = await Collection.findOne({
          collection_address: req.body.collection_address,
        });
        if (collection)
          return res.status(201).json({ success: true, data: collection });
        collection = await Collection.create(req.body);
        res.status(201).json({ success: true, data: collection });
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
