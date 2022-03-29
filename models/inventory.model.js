const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    sNo : { type: Number },
    inventoryName : { type: String },
    inventoryBuyDate : { type: String },
    inventoryCost : { type: Number },
    inventoryQty : { type: Number },
    inventoryTotalCost : { type: Number },
    inventoryMaintenanceDate : { type: String }
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;