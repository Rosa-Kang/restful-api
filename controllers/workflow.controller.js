import dayjs from 'dayjs';
import { createRequire  } from 'module';
const require = createRequire(import.meta.url);
import Subscription from '../models/subscription.model.js';

const { serve } = require('upstash/workflow/express'); //When packages are written as ESM modules --> you can use import instead of require

export const sendReminders = serve(async(context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.status !== 'active') return;

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
        return;
    }

    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');

        if(reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `${daysBefore} days before renewal`, reminderDate);
        }
        await triggerReminder(context, `reminder-${daysBefore}`);
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', ()=> {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    })
};

const sleepUntilReminder = async(context, label, date)=> {
    console.log(`Waiting until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate())
}

const triggerReminder = async(context, label)=>{
    return await context.run(label, ()=> {
        console.log(`Triggering ${label} reminder`);

        //Send email, SMS, push notification, etc.
    })
}