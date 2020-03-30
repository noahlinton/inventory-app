const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const InventoryItemSchema = new Schema({
    itemName: String,
    description: String,
    date: {
        type: String,
        default: Date.now()
    }
});

// Model
const InventoryItem = mongoose.model("InventoryItem", InventoryItemSchema);

module.exports = InventoryItem;