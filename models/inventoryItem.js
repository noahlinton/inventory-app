const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const InventoryItemSchema = new Schema({
    itemName: String,
    location: String,
    section: String,
    shelf: String,
    bin: String,
    description: String,
    keywords: String,
    date: {
        type: String,
        default: Date.now()
    }
});

// Model
const InventoryItem = mongoose.model("InventoryItem", InventoryItemSchema);

module.exports = InventoryItem;