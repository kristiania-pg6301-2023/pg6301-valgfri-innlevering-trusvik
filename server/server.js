import express from "express";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
app.use(express.static("../client/dist"))

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

client.connect().then((connection) => {
    const db = connection.db("sample_mflix");
    createUserRouter(db);
});

app.listen(3000);