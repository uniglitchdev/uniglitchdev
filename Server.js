const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = "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"; // Replace with OpenAI API key

app.post("/chat", async (req, res) => {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + API_KEY
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: req.body.messages
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/", (req, res) => {
    res.send("AI Proxy Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
