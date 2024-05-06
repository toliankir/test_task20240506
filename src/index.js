const express = require("express")
const mongoose = require("mongoose");
const app = express()
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static("public"))

const { Test } = require("./models/test");

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB);

        const existingEntity = await Test.find({ foo: { $eq: "bar" } });
        if (existingEntity.length === 0) {
            const testEntity = new Test({ foo: "bar" });
            await testEntity.save();
        }

        io.on("connection", (socket) => {
            console.log("user connected");

            socket.on("request", async (message) => {
                const [entity] = await Test.find({ foo: { $eq: "bar" } });
                socket.emit("response", entity);
            })

            socket.on("disconnect", function () {
                console.log("user disconnected");
            });
        })

        server.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();
