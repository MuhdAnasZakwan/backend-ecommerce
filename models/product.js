const {Schema, model} = require("mongoose");

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    category: { type: String, required: true },
});

// create Modal from schema
const Product = model("Product", productSchema);

module.exports = Product;