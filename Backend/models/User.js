const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: 2,

        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,

        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 8,
            select: false, // Exclude password from query results by default
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,

    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;