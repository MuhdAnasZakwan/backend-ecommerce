const Product = require("../models/product");

async function getProducts(category, page = 1, itemsPerPage = 6) {
    let filter = {};
    if (category) {
        filter.category = category;
    }

    const products = await Product.find(filter)
        .limit(itemsPerPage)
        .skip((page - 1) * itemsPerPage)
        .sort({ _id: -1 });
    return products;
}

async function getProduct(id) {
    const product = await Product.findById(id);
    return product;
}

async function addProduct(name, description, price, category) {
    const newProduct = new Product({
        name: name,
        description: description,
        price: price,
        category: category,
    });
    await newProduct.save();
    return newProduct;
}

async function updateProduct(id, name, description, price, category) {
    return await Product.findByIdAndUpdate(
        id,
        {
            name: name,
            description: description,
            price: price,
            category: category,
        },
        {
            new: true,
        }
    );
}

async function deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
}

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
};
