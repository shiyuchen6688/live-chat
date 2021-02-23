const express = require('express');
const router = express.Router(); // create a new router object to handle request

// get request to root
router.get('/', (req, res) => {
    res.send('server is running');
});

module.exports = router;