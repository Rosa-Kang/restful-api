import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        // create a new subscription
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });

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