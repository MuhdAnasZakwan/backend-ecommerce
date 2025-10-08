const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/auth");
const {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/product");

router.get("/", async (req, res) => {
    try {
        const category = req.query.category;
        const page = req.query.page;
        const products = await getProducts(category, page);

        res.status(200).send(products);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Unknown error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await getProduct(id);

        res.status(200).send(product);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Unknown error" });
    }
});

router.post("/", isAdmin, async (req, res) => {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const category = req.body.category;
        const image = req.body.image;

        if (!name || !price || !category) {
            return res.status(400).send({
                message: "All fields are required",
            });
        }

        res.status(200).send(
            await addProduct(name, description, price, category, image)
        );
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Unknown error" });
    }
});

router.put("/:id", isAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const category = req.body.category;
        const image = req.body.image;

        if (!name || !price || !category) {
            return res.status(400).send({
                message: "All fields are required",
            });
        }

        res.status(200).send(
            await updateProduct(id, name, description, price, category, image)
        );
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Unknown Error" });
    }
});

router.delete("/:id", isAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        await deleteProduct(id);
        res.status(200).send({
            message: `Product with the id of ${id} has been deleted`,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Unknown Error" });
    }
});

module.exports = router;
