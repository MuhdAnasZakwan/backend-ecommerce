const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getUserByEmail = async (email) => {
    return await User.findOne({email: email});
}

const login = async (email, password) => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error("Invalid email or password");
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
        throw new Error("Invalid email or password");
    }

    let token = jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 * 8 }
    );

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token,
    };
};

const signup = async (name, email, password) => {
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
        throw new Error(
            "Email already exists. Please use another email or login with your existing email"
        );
    }
    const newUser = new User({
        name: name,
        email: email,
        password: bcrypt.hashSync(password, 10),
    });
    await newUser.save();

    let token = jwt.sign(
        {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 * 8 }
    );

    return {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token: token,
    };
};

module.exports = { login, signup, getUserByEmail };
