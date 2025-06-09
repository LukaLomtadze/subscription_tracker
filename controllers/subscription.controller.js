import Subscription from "../models/subscription.model.js"
import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";

export const createSubscription = async (req, res, next)  => {
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        await workflowClient.trigger({
            url: `${SERVER_URL}`
        })

        res.status(201).json({success: true, data: subscription})
    }
    catch(err){
        next(err)
    }
}

export const getUserSubscriptions = async (req,res,next) => {
    try{
        if(req.user.id !== req.params.id){
            const error = new Error("You are not the owner of this account");
            error.status = 401;
            throw error
        }

        const subscriptions = await Subscription.find({user: req.params.id})

        res.status(200).json({success: true, data: subscriptions});
    }
    catch(err){
        next(err)
    }
}


export const getAllSubscriptions = async (req, res, next) => {
    try{
        const subs = await Subscription.find().populate("user", "name email")
        res.status(200).json({success: true, data: subs});  
    }
    catch(err){
        next(err)
    }
}

export const deleteSubscription = async(req, res, next) => {
    try{
        const subToDelete = await Subscription.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        })

        if(!subToDelete){
            res.status(404).json({success: false, message: "Subscription not found"})
        }

        res.status(200).json({success: true, message: "Subscription deleted succesfully"})
    }catch(err){
        next(err)
    }
}