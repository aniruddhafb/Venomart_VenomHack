import dbConnect from "@/lib/dbConnect";
import Collection from "../../models/NFTCollection";
import User from "../../models/User";

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
        const {
          collection_address,
          user_wallet,
          cover_image,
          logo,
          name,
          symbol,
          description,
        } = req.body;

        const owner = await User.findOne({ wallet_id: user_wallet });
        if (!owner)
          return res
            .status(400)
            .json({ success: false, data: "cannot find the user" });

        collection = await Collection.create({
          collection_address,
          owner,
          coverImage: cover_image,
          logo,
          name,
          symbol,
          description,
        });
        res.status(200).json({ success: true, data: collection });
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
