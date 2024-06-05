import User from "../models/userModel.js";

export const getUsersForSidebar = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;

        const filterdUser = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filterdUser);
    }catch(error){
        res.status(500).json(error)
    }
}