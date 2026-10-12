// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const aiRoutes = require("./routes/ai.routes");
// const historyRoutes = require("./routes/history.routes");

// const userRoutes = require("./routes/user.routes");

// const connectDB = require("./config/db");

// const app = express();

// // Connect to MongoDB



// //Routes

// const authRoutes = require("./routes/auth.routes");



// // Middleware

// app.use(cors());
// app.use(express.json({ limit: "10kb"}));


// // root Routes

// app.get("/", (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "Welcome to the AI SaaS Platform API",
//     });
// });

// const { 
//     notFound,
//     errorHandler ,
// } = require("./middleware/error.middleware");

// // Error Handling Middleware
// app.use(notFound);
// app.use(errorHandler);


// // API Routes

// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/history", historyRoutes);
// app.use("/api/ai", aiRoutes);
    

// const startServer = async () => {
//     try {
//         await connectDB();

//         app.listen(process.env.PORT || 5000, () => {
//             console.log(`Server is running on port ${process.env.PORT || 5000}`);
//         });

//     } catch (error) {
//         console.error("Failed to start server:", error.message);
//         process.exit(1);
//     }
// };

// startServer();
















const express = require("express");
const cors = require("cors");
require("dotenv").config();

const aiRoutes = require("./routes/ai.routes");
const historyRoutes = require("./routes/history.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");

const connectDB = require("./config/db");

const {
    notFound,
    errorHandler,
} = require("./middleware/error.middleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10kb" }));

// Root Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the AI SaaS Platform API",
    });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/users", userRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/ai", aiRoutes);

// Error Handling Middleware
// IMPORTANT: These must be after all routes.
app.use(notFound);
app.use(errorHandler);

// Start Server
const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();