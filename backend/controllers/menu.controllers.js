const Menu = require('../models/menu.models'); // Assuming you have a Mongoose model for Menu

// Fetch all menu items
exports.getMenu = async (req, res) => {
    try {
        const menu = await Menu.find();
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu', error });
    }
};

// Add a new menu item
exports.addMenuItem = async (req, res) => {
    try {
        const newItem = new Menu(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Error adding menu item', error });
    }
};

// Update a menu item
exports.updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await Menu.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Menu item not found' });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error updating menu item', error });
    }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Menu.findByIdAndDelete(id);
        if (!deletedItem) return res.status(404).json({ message: 'Menu item not found' });
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting menu item', error });
    }
};
