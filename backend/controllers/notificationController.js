import Notification from "../models/notifyModel.js";

export const getNotifications = async(req , res) => {
    try{
        const userId = req.user._id;
        const notification = await Notification.find({to : userId}).populate({
            path : "from",
            select : "username profileImg" //it only brings these both
        })
        await Notification.updateMany({to : userId}, {read : true})
        res.status(200).json(notification);
    } catch (error){
        console.log(`Error in get notification  controller ${error}`);
        res.status(500).json({error : "internal server Error"})
    }
}

export const deleteNotifications = async(req , res) => {
    try{
        const userId = req.user._id;
        await Notification.deleteMany({to : userId})

        res.status(200).json({message : "notification deleted successfully"})
    } catch (error){
        console.log(`Error in delete notification controller ${error}`);
        res.status(500).json({error : "internal server Error"})
    }
}