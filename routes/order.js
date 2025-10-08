const express = require("express");
const router = express.Router();

const {
    getOrders,
    getOrder,
    addNewOrder,
    updateOrder,
    deleteOrder,
} = require("../controllers/order");

const {isValidUser, isAdmin} = require("../middleware/auth");

router.get("/", isValidUser, async (req, res) => {
    try {
        const orders = await getOrders(req.user);
        res.status(200).send(orders);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Unknown error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const order = await getOrder(id);
        res.status(200).send(order);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Unknown error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const customerName = req.body.customerName;
        const customerEmail = req.body.customerEmail;
        const products = req.body.products;
        const totalPrice = req.body.totalPrice;

        const newOrder = await addNewOrder(
            customerName,
            customerEmail,
            products,
            totalPrice
        );

        res.status(200).send(newOrder);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Unknown error" });
    }
});

router.put("/:id", isAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        const updatedOrder = await updateOrder(id, status);
        res.status(200).send(updatedOrder);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Unknown error" });
    }
});

router.delete("/:id", isAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        await deleteOrder(id);
        res.status(200).send({
            message: `Order #${id} has been deleted`,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Unknown error" });
    }
});

module.exports = router;
