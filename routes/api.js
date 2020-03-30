const express = require("express");

const router = express.Router();
const InventoryItem = require('../models/inventoryItem')

router.get("/", (req, res) => {

    InventoryItem.find({})
        .then((data) => {
            console.log("Data: ", data);
            res.json(data);
        })
        .catch((error) => {
            console.log("Error: ", error);
        });

});

router.post("/save", (req, res) => {
    const data = req.body;
    const newInventoryItem = new InventoryItem(data)
    console.log(data);

    newInventoryItem.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server error' })
            return;
        }
        return res.json({
            msg: 'We received your data'
        });
    });
});

module.exports = router;