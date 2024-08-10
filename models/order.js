const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    foods: [
        { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Foods' 
    }
    ],
    payment: {},
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['preparing', 'prepare', 'on the way', 'delivered'],
        default: 'preparing'
    }
}, { timestamps: true });

module.exports = mongoose.model("Orders", OrderSchema);
