const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS
app.use(express.json());

// Route to get knowledge base
app.get('/knowledge_base', (req, res) => {
    const filePath = path.join(__dirname, 'knowledge_base.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading knowledge base');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Route to update knowledge base
app.post('/knowledge_base', (req, res) => {
    const filePath = path.join(__dirname, 'knowledge_base.json');
    const newEntry = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading knowledge base');
            return;
        }

        const knowledgeBase = JSON.parse(data);
        knowledgeBase.questions.push(newEntry);

        fs.writeFile(filePath, JSON.stringify(knowledgeBase, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error updating knowledge base');
                return;
            }
            res.status(200).send('Knowledge base updated');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
