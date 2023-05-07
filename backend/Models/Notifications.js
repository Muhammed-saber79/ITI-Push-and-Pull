const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    content:{
        type: String,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: "6457ff378a1590aae66bdbca"
    }
}, {timestamps: true})

mongoose.model("notifications", notificationSchema)