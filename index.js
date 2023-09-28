const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/insideDocs', require('./routes/insideDocs'));
app.use('/dataBase', require('./routes/dataBase'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));


app.get('/', (req, res) => {
    let fileHtml = fs.readFileSync('./htmlDocs/index.html', 'utf-8');
    res.send(fileHtml);
    res.end();
});

app.all('/*', (req, res) => {
    let fileHtml = fs.readFileSync('./htmlDocs/404.html', 'utf-8');
    res.send(fileHtml);
    res.end();
})

app.listen(PORT, () => {console.log('Server listening on port '+PORT)});