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
        await mongoose.connect("mongodb://localhost:27017/ecommerce");
        console.log("MongoDB is connected");
    } catch (error) {
        console.log(error);
    }
}
// trigger connection
connectToMongoDB();

// setup route
app.get("/", (req, res) => {
    res.send("Happy coding");
});

const productRouter = require("./routes/product");
app.use("/products", productRouter);

// start express
app.listen(5123, () => {
    console.log("Server is running at http://localhost:5123");
});
