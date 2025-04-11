import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    price: { type: Number, required: true, min: [0, 'Price must be greater than 0'] },
    currency: { type: String, required: true, enum: ['USD', 'EUR', 'GBP', 'CAD', 'KRW'], default: 'USD' },
    frequency: { type: String, required: true, enum: ['monthly', 'yearly'], default: 'monthly' },
    category: { type: String, required: true, enum: ['sports', 'news', 'entertainment', 'technology', 'finance', 'politics', 'other']},
    paymentMethod: { type: String, required: true },
    status: { type: String, required: true, enum: ['active', 'expired', 'cancelled'], default: 'active' },
    startDate: {
         type: Date,
         required: true,
         validate: {
             validator: (value)=> value <= new Date(),
             message: 'Start date must be in the past' 
         }
    },
    renewalDate: {
         type: Date,
         validate: {
             validator: function(value) {
                 return value > this.startDate;
             }, 
             message: 'End date must be after start date' 
        }
    },
    user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User", 
         required: true,
         index: true,
    },       
}, { timestamps: true });

// Auto-calculate renewal date based on frequency
subscriptionSchema.pre('save', function(next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            monthly: 30,
            yearly: 365,
        };
        const renewalDate = new Date(this.startDate);
        renewalDate.setDate(renewalDate.getDate() + renewalPeriods[this.frequency]);
        this.renewalDate = renewalDate;
    }
    // Auto update the status if renewal date has passed
    if(this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    
    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
