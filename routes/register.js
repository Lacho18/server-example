const express = require('express');
const router = express.Router(); 
const registerControler = require("../controllers/registerControler");

router.post("/", registerControler.handleNewUser);

module.exports = router;