const express = require("express");
const router = express.Router();

const { verifyPayment } = require("../controllers/payment");

router.post("/", async (req, res) => {
    try {
        const billplz_id = req.body.billplz_id;
        const billplz_paid = req.body.billplz_paid;
        const billplz_paid_at = req.body.billplz_paid_at;
        const billplz_x_signature = req.body.billplz_x_signature;

        const updatedOrder = await verifyPayment(
            billplz_id,
            billplz_paid,
            billplz_paid_at,
            billplz_x_signature
        );

        res.status(200).send(updatedOrder);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            error: "unable to verify payment",
        });
    }
});

module.exports = router;