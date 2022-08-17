const db = require('../shared/mongo');

const postApi = require('express').Router();

postApi.post("/", async (req, res) => {
    try {
        console.log("in Post ");
        const post_data = req.body;
        await db.mobile.insertOne(post_data);
        res.status(201).send({ message: "Post Created Successfully" });
    } catch (error) {
        res.status(404).send({
            message: error.message,
            error_message: "Post is not created"
        })
    }
})


postApi.get("/", async (req, res) => {
    try {
        console.log("in find all post")
        const all_post = await db.mobile.find().toArray();
        res.status(200).send({ message: "Successfully Get all data", data: all_post });
    } catch (error) {
        res.status(404).send({
            message: error.message,
            error_message: "Error To Fetch Data"
        })
    }
})

postApi.get("/:id", async (req, res) => {
    try {
        console.log("in find selected data")
        const post_Id = req.params.id;
        const single_post = await db.mobile.findOne({ _id: ObjectId(post_Id) })
        res.status(200).send({ message: "successfully get selected data", single_post })
    } catch (error) {
        res.status(404).send({
            message: error.message,
            error_message: "Invalid Request, check your url"
        })
    }
})


postApi.put("/:id", async (req, res) => {
    try {
        console.log("in post update");
        const post_Id = req.params.id;
        const update_post = req.body;
        await db.mobile.findOneAndUpdate({ _id: ObjectId(post_Id) }, { $set: { ...update_post } }, { returnDocument: "after" })
        res.status(200).send({ message: "successfully updated" });
    } catch (error) {
        res.status(404).send({
            message: error.message,
            error_message: "Not Updated, check your url"
        })
    }
})

postApi.delete("/:id", async (req, res) => {
    try {
        console.log("in delete post")
        const post_Id = req.params.id;
        await db.mobile.deleteOne({ _id: ObjectId(post_Id) })
        res.status(200).send({ message: "successfully Deleted" })
    } catch (error) {
        res.status(404).send({
            message: error.message,
            error_message: "post deleted, check your url"
        })
    }
})


module.exports = postApi