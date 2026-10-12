// Not Found Middleware
const notFound = (req, res, next) => {
    const error = new Error(
        `Route not found: ${req.originalUrl}`
    );

    res.status(404);
    next(error);
};

// Global Error Handler
const errorHandler = (err, req, res, next) => {
    const statusCode =
        res.statusCode && res.statusCode !== 200
            ? res.statusCode
            : 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};

module.exports = {
    notFound,
    errorHandler,
};