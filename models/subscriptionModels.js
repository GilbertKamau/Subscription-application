import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Price must be a positive number"]
    },
    currency: {
        type:String,
        enum:["USD", "INR", "EUR", "GBP", "AUD", "CAD", "JPY", "CNY", "MXN", "BRL", "KES"],
        default: "KES"
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"]
    },
    category:  {
        type: String,
        enum: ["sports", "entartainment", "lifestyle", "technology", "finance", "politics", "othher"],
        required: [true, "Subscription category is required"]
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment method is required"],
        trim: true
    },
    status: {
        type: String,
        enum: ["active", "inactive", "cancelled"],
        default: "active"
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value<= new Date(),
            message: "Start date must be in the past or present",
        }
    },
    renewalDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value >= this.startDate;
            },
            message: "End date must be in the future",
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true});

// Auto calculate renewal date
subscriptionSchema.pre("save", function (next) {
    if (this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    // renewal date passed
    if (this.renewalDate < new Date()) {
        this.status = "inactive";
    }
    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;