import Subscription from "../models/subscription.model.js";
import { workflowClient } from 'upstash/workflow';

export const createSubscription = async (req, res, next) => {
    try {
        // create a new subscription
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });

        await workflowClient.trigger()

        // send response
        res.status(201).json({
            success: true,
            data: subscription,
            message: 'Subscription created successfully'
        })
        
    } catch (error) {
        next(error);
    }
}   

export const getUserSubscriptions = async (req, res, next) => {
    try {
        
        //check if the user is the same as the one in the token
        if(req.user.id !== req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.statusCode = 401;
            throw error;
        }
        
        const subscriptions = await Subscription.find({user: req.params.id});

        res.status(200).json({
            success: true,
            data: subscriptions,
        })

        // send response
        res.status(200).json({
            success: true,
            data: subscriptions,
            message: 'Subscriptions fetched successfully'
        })
        
    } catch (e) {
        next(e)
    }
}