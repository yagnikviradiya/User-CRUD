const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean,
        require: true
    },
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

const User = mongoose.model("User", userSchema);
module.exports = User;
