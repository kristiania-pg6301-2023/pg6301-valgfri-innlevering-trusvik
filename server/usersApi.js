import express from "express";

export const usersApi = express.Router();

let db;

export const setDb = (database) => {
    db = database;
};

usersApi.get("/exists/email", async (req, res) => {
    const usersCollection = db.collection("users");

    const email = req.params.email;

    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
        return res.status(200).send({ exists: true });
    } else {
        return res.status(200).send({ exists: false });
    }
});

usersApi.post("/", async (req, res) => {
    const usersCollection = db.collection("users");

    const { email, name, password } = req.body;

    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
        return res.status(400).send('User with this email already exists');
    }

    const newUser = {
        name,
        email,
        password,
    };

    await usersCollection.insertOne(newUser);

    res.status(201).send('User created successfully');
});
