const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/insideIndex(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'htmlDocs', 'insideDocs', 'insideIndex.html'));
});

router.get('/test(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'htmlDocs', 'insideDocs', 'test.html'));
});

module.exports = router;