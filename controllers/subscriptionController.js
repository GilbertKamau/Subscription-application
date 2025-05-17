import { workflowClient } from '../config/upstash.js';
import subscriptionModel from '../models/subscriptionModels.js';

// Function to create a new subscription
export const createSubscription = async (req, res) => {
    try {
        const subscription = await subscriptionModel.create({
            ...req.body,
            user: req.user._id,
        });
        await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'Content-Type': 'application/json',
            },
            retries: 0,
        });

        res.status(201).json({
            success: true,
            data: subscription,
        });
    } catch (e) {
        next(e)
    }
}

export const getAllSubscriptions = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = new Error ('You are not the owner of this account');
            error.status = 401;
            throw error;
        }
        const subscriptions = await subscriptionModel.find({ user: req.params.id });
        res.status(200).json({
            success: true,
            data: subscriptions,
        });
    } catch (e) {
        next(e)
    }
}