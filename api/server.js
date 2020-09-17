const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

// const router = express.Router();

server.get("/api/accounts", async (req, res) => {
    try {
        const accounts = await db("accounts").then((accounts) => {
            res.status(200).json(accounts);
        });
    } catch {
        res.status(500).json({ message: "Could not retrieve the accounts." });
    }
});

server.get("/api/accounts/:id", async (req, res) => {
    try {
        const account = await db("accounts").where({ id: req.params.id });
        res.status(200).json(account);
    } catch {
        res.status(500).json({
            message: "Could not retrieve the account on that id.",
        });
    }
});

server.post("/api/accounts", async (req, res) => {
    try {
        const newAccount = await db("accounts").insert(req.body);
        res.status(201).json(newAccount);
    } catch {
        res.status(500).json({
            message: "Could not add the account.",
        });
    }
});

server.put("/api/accounts/:id", async (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    try {
        const account = await db("accounts").update(changes).where({ id });

        if (account) {
            res.status(201).json({ updated: account });
        } else {
            res.status(404).json({ message: "Invalid id." });
        }
    } catch {
        res.status(500).json({
            message: "Could not change the account.",
        });
    }
});

server.delete("/api/accounts/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const delAccount = await db("accounts").where({ id }).del();
        res.status(200).json({ deleted: delAccount });
    } catch {
        res.status(500).json({
            message: "Could not delete the account.",
        });
    }
});

module.exports = server;
