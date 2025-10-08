const Category = require("../models/category");

const getCategories = async () => {
    const cateogries = await Category.find().sort({ _id: -1 });
    return cateogries;
};

const getCategory = async (id) => {
    const cateogry = await Category.findById(id);
    return cateogry;
};

const addNewCategory = async (label) => {
    const newCategory = new Category({
        label,
    });
    await newCategory.save();
    return newCategory;
};

const updateCategory = async (id, label) => {
    const updatedCategory = await Category.findByIdAndUpdate(
        id,
        {
            label,
        },
        {
            new: true,
        }
    );
    return updatedCategory;
};

const deleteCategory = async (id) => {
    return await Category.findByIdAndDelete(id);
};

module.exports = {
    getCategories,
    getCategory,
    addNewCategory,
    updateCategory,
    deleteCategory,
};
