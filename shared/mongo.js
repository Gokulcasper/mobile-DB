const { MongoClient } = require("mongodb");

const DB_URL = "mongodb+srv://GokulCasper:Gokul_2506@gokulcaper.lr72vn2.mongodb.net/?retryWrites=true&w=majority";


const DB_NAME = "Apple";

const client = new MongoClient(DB_URL);

const mongo = {
    db: null,
    mobile: null,
    laptops: null,

    async connect() {

        await client.connect();

        this.db = client.db(DB_NAME);

        this.mobile = this.db.collection("mobile");

        console.log("DB is connected");
    },
};
module.exports = mongo;