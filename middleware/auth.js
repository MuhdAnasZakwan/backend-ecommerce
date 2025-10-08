const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../controllers/user");

const isValidUser = async (req, res, next) => {
    try {
        const { authorization = "" } = req.headers;

        const token = authorization.replace("Bearer ", "");
        // const token = authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await getUserByEmail(decoded.email);
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(400).send({ error: "YOU SHALL NOT PASS" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({error: "YOU SHALL NOT PASS"});
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const { authorization = "" } = req.headers;

        const token = authorization.replace("Bearer ", "");
        // const token = authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await getUserByEmail(decoded.email);
        if (user && user.role === "admin") {
            req.user = user;
            next();
        } else {
            res.status(400).send({ error: "YOU SHALL NOT PASS" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({error: "YOU SHALL NOT PASS"});
    }
};

module.exports = {
    isValidUser,
    isAdmin,
};
