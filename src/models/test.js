const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
    foo: {
        type: String,
        required: true,
    },
}, { collection: "test" });

const Test = mongoose.model("Test", TestSchema);

module.exports = { Test };