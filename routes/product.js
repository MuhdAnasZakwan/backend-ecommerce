const express = require("express");
const router = express.Router();
const {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/product");

router.get("/", async (req, res) => {
    const category = req.query.category;
    const products = await getProducts(category);

    res.status(200).send(products);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const product = await getProduct(id);

    res.status(200).send(product);
});

router.post("/", async (req, res) => {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const category = req.body.category;

        if (!name || !price || !category) {
            return res.status(400).send({
                message: "All fields are required",
            });
        }

        res.status(200).send(
            await addProduct(name, description, price, category)
        );
    } catch (error) {
        res.status(400).send({ message: "Unknown error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const category = req.body.category;

        if (!name || !price || !category) {
            return res.status(400).send({
                message: "All fields are required",
            });
        }

        res.status(200).send(
            await updateProduct(id, name, description, price, category)
        );
    } catch (error) {
        res.status(400).send({ message: "Unknown Error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await deleteProduct(id);
        res.status(200).send({
            message: `Product with the id of ${id} has been deleted`,
        });
    } catch (error) {
        res.status(400).send({ message: "Unknown Error" });
    }
});

module.exports = router;
