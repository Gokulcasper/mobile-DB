const cors = require("cors");
const express = require("express");
const postApi = require("./routes/posts");
const db = require("./shared/mongo");

const server = express();

let PORT = 5000;

(async () => {
    try {
        server.use(cors("*"));
        server.use(express.json());
        server.get("/", (req, res) => {
            res.status(200).send("server is running successfully");
        });

        await db.connect();

        server.use("/posts", postApi);
        server.listen(PORT, () => {
            console.log("server is running at port", PORT);
        });
    } catch (error) {
        console.log("Error:", error.message)
    }
})();
