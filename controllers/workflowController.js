import dayjs from 'dayjs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');

import Subscription from '../models/subscriptionModels';

const REMINDERS = [ 15, 7, 3, 1 ];

export const sendReminder =  serve(async (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status !== 'active') return;

    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionId}.Stopping workflow.`);
        return;
    }
    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');
      
            if(reminderDate.isAfter(dayjs())) {
                await sleepUntilReminder(context, `Reminder ${daysBefore}`, reminderDate);
            }

            await triggerReminder(context, `Reminder ${daysBefore} days before` );
        }
    });

const fetchSubscription = async (context, subscriptionId) => {
    return context.run('get subscription', ()=> {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    })
}

const sleepUntilReminder = async (context, label, date) => {
    const now = dayjs();
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`);
    });

    // Send email or notification to user
}