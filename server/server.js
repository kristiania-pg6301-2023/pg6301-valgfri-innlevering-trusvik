import * as path from "path";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { usersApi, setDb } from './usersApi.js';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

let db;

const loginRouter = express.Router();

loginRouter.post("", async (req, res) => {
    try {
        const usersCollection = db.collection("users");
        const { email, password } = req.body;

        const user = await usersCollection.findOne({ email });

        if (user && user.password === password) {
            res.cookie("email", email);
            res.sendStatus(204);
        } else {
            res.status(401).send("Invalid email or password");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

app.use("/api/login", loginRouter)
app.use(express.static("../client/dist"))
app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
})

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

client.connect().then((connection) => {
    db = connection.db("sample_mflix");
    setDb(db);
    app.use('/api/users', usersApi);
});

app.listen(process.env.PORT || 3000);
