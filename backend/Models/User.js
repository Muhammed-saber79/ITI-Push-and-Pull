const mongoose = require("mongoose");

let userSchema = mongoose.Schema.object({
    name: String,
})

mongoose.model("user", userSchema);