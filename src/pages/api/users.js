import dbConnect from "@/lib/dbConnect";
import User from "../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        console.log({ res: req.body });
        let user;
        user = await User.findOne({ wallet_id: req.body.wallet_id });
        if (user) return res.status(201).json({ success: true, user: user });

        user = await User.create(req.body);

        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
      }
      break;
    case "PUT":
      try {
        const {
          wallet_id,
          user_name,
          email,
          bio,
          profileImage,
          coverImage,
          socials,
          isArtist,
        } = req.body;
        let user;
        user = await User.findOne({ wallet_id });
        if (!user)
          return res
            .status(404)
            .json({ success: false, data: "Cannot Find The User" });
        const update_user = await User.findOneAndUpdate(
          { wallet_id },
          {
            user_name,
            email,
            bio,
            profileImage,
            coverImage,
            socials,
            isArtist,
          },
          { new: true }
        );

        return res.status(201).json({ success: true, data: update_user });
      } catch (error) {
        return res.status(500).json({ success: false, data: error.message });
      }
    default:
      res.status(400).json({ success: false });
      break;
  }
}
