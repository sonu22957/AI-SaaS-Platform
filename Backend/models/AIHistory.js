const mongoose = require('mongoose');

const aiHistorySchema = new mongoose.Schema(
    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        tool: {
            type: String,
            enum: ['text-generation', 'image-generation', 'code-generation'],
            required: true,
        },

        prompt: {
            type: String,
            required: true,
            maxlength: 1000,
        },

        response: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
    
const AIHistory = mongoose.model('AIHistory', aiHistorySchema);
module.exports = AIHistory;