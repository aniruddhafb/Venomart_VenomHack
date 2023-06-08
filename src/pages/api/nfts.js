import dbConnect from "@/lib/dbConnect";
import Nft from "../../models/Nft";
import User from "../../models/User";
import NFTCollection from "../../models/NFTCollection";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const nfts = await Nft.find({}).populate("owner");
        res.status(200).json({ success: true, data: nfts });
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
      }
      break;
    case "POST":
      try {
        let nft;
        const { tokenId, collection_name, json, owner } = req.body;

        // check if nft exists then return
        nft = await Nft.findOne({ tokenId: req.body.tokenId });
        if (nft) return res.status(201).json({ success: true, data: nft });

        //check if given collection exists
        const nft_collection = await NFTCollection.findOne({
          name: collection_name,
        });

        if (!nft_collection)
          return res
            .status(400)
            .json({ success: false, data: "Cannot find the collection" });

        //check if user exists
        let nft_owner = await User.findOne({ wallet_id: owner });
        if (!nft_owner)
          return res
            .status(400)
            .json({ success: false, data: "Cannot Find The Owner" });

        nft = await Nft.create({
          tokenId,
          nft_collection,
          json,
          owner: nft_owner,
        });
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
