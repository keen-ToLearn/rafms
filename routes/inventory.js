const express = require('express');
const router = express.Router();

const Inventory = require('../models/inventory.model');

router.get('/', (req, res) => {
    Inventory.find()
        .then(inventory => res.json(inventory))
        .catch(error => res.status(404).json(error));
});

router.post('/', (req, res) => {
    const newInventory = new Inventory({
        sNo : req.body.sNo,
        inventoryName : req.body.inventoryName,
        inventoryBuyDate : req.body.inventoryBuyDate,
        inventoryCost : req.body.inventoryCost,
        inventoryQty : req.body.inventoryQty,
        inventoryTotalCost : req.body.inventoryTotalCost,
        inventoryMaintenanceDate : req.body.inventoryMaintenanceDate
    });

    newInventory.save()
        .then(inventory => res.json(inventory))
        .catch(error => res.status(400).json(error));
});

router.put('/:id', (req, res) => {
    Inventory.findByIdAndUpdate(req.params.id, {$set : req.body}, {new : true})
        .then(inventory => res.json(inventory))
        .catch(error => res.status(400).json(error));
});

module.exports = router;