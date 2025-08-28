const { createHmac } = require("crypto");

const Order = require("../models/order");

const verifyPayment = async (
    billplz_id,
    billplz_paid,
    billplz_paid_at,
    billplz_x_signature
) => {
    const billplz_string = `billplzid${billplz_id}|billplzpaid_at${billplz_paid_at}|billplzpaid${billplz_paid}`;
    const x_signature = createHmac("sha256", process.env.BILLPLZ_X_SIGNATURE)
        .update(billplz_string)
        .digest("hex");

    // console.log("Generated Signature", x_signature);
    // console.log("billplz_x_signature", billplz_x_signature);
    if (x_signature !== billplz_x_signature) {
        throw new Error("Signature not valid");
    }

    const selectedOrder = await Order.findOne({ billplz_id: billplz_id });
    if (!selectedOrder) {
        throw new Error("Order not found");
    }

    if (billplz_paid === "true") {
        selectedOrder.status = "paid";
        selectedOrder.paid_at = billplz_paid_at;
    } else {
        selectedOrder.status = "failed";
    }

    await selectedOrder.save();

    return selectedOrder;
};

module.exports = {
    verifyPayment,
};
