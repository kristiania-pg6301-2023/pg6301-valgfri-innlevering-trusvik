import * as path from "path";

import express from "express";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { usersApi, setDb } from './usersApi.js';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

const loginRouter = express.Router();
loginRouter.post("", (req, res) => {
    res.cookie("email", req.body.email);
    res.sendStatus(204);
})
app.use("/api/login", loginRouter)

app.use(express.static("../client/dist"))
app.use((req, res, next) => {
    if(req.method === "GET" && !req.path.startsWith("/api")){
        res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
})


const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

client.connect().then((connection) => {
    const db = connection.db("sample_mflix");

    setDb(db);

    app.use('/api/users', usersApi);
});

app.listen(process.env.PORT || 3000);