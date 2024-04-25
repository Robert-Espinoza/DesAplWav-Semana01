const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const url = req.url;
    let filePath = path.join(__dirname, 'Pages', url === '/' ? '/Inicio.html' : url + '.html');
    let contentType = 'text/html';

    if (filePath.endsWith('.css')) {
        contentType = 'text/css';
    }

    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

const port = 8080;
server.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});