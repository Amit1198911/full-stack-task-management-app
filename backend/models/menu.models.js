const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    availability : {
        type: Boolean,
        default: true
    }
},{timestamps: true});

module.exports = mongoose.model('Menu', menuSchema);