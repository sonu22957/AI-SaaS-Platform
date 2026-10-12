const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

//REGISTER USER
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //Validate input

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Check existing user
        const existingUser = await User.findOne({ email: 
normalizedEmail });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            name : name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
        });

        // Generate token
        const token = generateToken(newUser._id);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email",
            });
        }

        console.error("Error registering user:", error);

        return res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};


//LOGIN USER

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // password is not selected by default due to select: false in the schema, so we need to explicitly select it here
        // so explicitly select it here
        const user = await User.findOne({
            email: normalizedEmail,
        }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Your account is inactive. Please contact support.",
            });
        }
        
        const token = generateToken(user._id);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Error logging in user:", error);

        return res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
        };

        module.exports = {
    registerUser,
    loginUser,
};