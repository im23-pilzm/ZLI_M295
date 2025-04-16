const express = require('express');
const app = express();
const port = 7004;
app.use(express.json());
require('dotenv').config();

const u_name = process.env.USERNAME_AUTH;
const u_password = process.env.PASSWORD_AUTH;

app.get("/public", async (req, res) => {
    res.status(200).send("You can use it without logging in.")
})

app.get("/private/:username/:password", async (req, res) => {
    const username = req.params.username
    const password = req.params.password

    if (!username || !password) {
        return res.status(401).json({ error: "Username and password required." });
    }

    if (password === u_password && username === u_name) {
        return res.status(200).json({ message: "Now you are in your private space." });
    } else {
        return res.status(401).json({ error: "Invalid username or password." });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
