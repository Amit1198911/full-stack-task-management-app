const Order = require("../models/order.models");
const mongoose = require("mongoose");

// Place an order
exports.placeOrder = async (req, res) => {
    try {
        console.log("Received Order Data:", req.body); // Debugging

        const { userId, items, totalamt } = req.body;
        
        // ✅ Validate userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "At least one item is required." });
        }

        // ✅ Validate menuItem IDs
        const updatedItems = items.map(item => {
            if (!mongoose.Types.ObjectId.isValid(item.menuItem)) {
                throw new Error(`Invalid menuItem ID: ${item.menuItem}`);
            }
            return {
                menuItem: new mongoose.Types.ObjectId(item.menuItem),
                quantity: item.quantity
            };
        });

        // ✅ Ensure totalamt is provided
        if (!totalamt || isNaN(totalamt)) {
            return res.status(400).json({ message: "totalamt must be a valid number" });
        }

        const newOrder = new Order({ userId, items: updatedItems, totalamt });
        await newOrder.save();

        res.status(201).json(newOrder);
    } catch (error) {
        console.error("Order Placement Error:", error);
        res.status(500).json({ message: "Error placing order", error: error.message });
    }
};


// Fetch all orders of a logged-in user
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        console.log("Orders:", orders);
        
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};
