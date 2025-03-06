const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve static files inside the "files" directory
app.use('/files', express.static(path.join(__dirname, 'files')));

// Generate and return directory listing when accessing "/files/"
app.get('/files/', (req, res) => {
    const filesDir = path.join(__dirname, 'files');

    fs.readdir(filesDir, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading directory');
        }

        let fileListHTML = '<h2>Files Directory</h2><ul>';
        files.forEach(file => {
            fileListHTML += `<li><a href="/files/${file}" download>${file}</a></li>`;
        });
        fileListHTML += '</ul>';

        res.send(fileListHTML);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
