require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// setup express
const app = express();

// JSON handling
app.use(express.json());

// CORS
app.use(cors());

// connect to mongodb with mongoose
async function connectToMongoDB() {
    try {
        // wait for MongoDB to connect
        await mongoose.connect(process.env.MONGODB_URL + "/ecommerce");
        console.log("MongoDB is connected");
    } catch (error) {
        console.log(error);
    }
}
// trigger connection
connectToMongoDB();

// setup route
app.get("/api", (req, res) => {
    res.send("Happy coding");
});

const productRouter = require("./routes/product");
app.use("/api/products", productRouter);
app.use("/api/orders", require("./routes/order"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api/image", require("./routes/image"));
app.use("/api/categories", require("./routes/category"));
app.use("/api/users", require("./routes/user"));

app.use("/api/uploads", express.static("uploads"));

// start express
app.listen(5123, () => {
    console.log("Server is running at http://localhost:5123");
});
