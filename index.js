const OpenAI = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3001;

const openai = new OpenAI({
    apiKey: "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",
    organization: "org-7xb1sD5srlpJlIudh4uiNEGg",
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// API endpoint
app.post('/', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await openai.chat.completions.create({ // Adjusted method here
            model: "ft:gpt-3.5-turbo-0613:personal::8E01q3ND",
            messages: [
                { role: "system", content: "You are Kevin, a student at the University of Pittsburgh interviewing for an internship at an AI startup." },
                { role: "user", content: message }
            ],
        });

        if (response.choices && response.choices[0] && response.choices[0].message) {
            res.json({ message: response.choices[0].message.content });
        } else {
            res.json({ message: "No response from model." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
