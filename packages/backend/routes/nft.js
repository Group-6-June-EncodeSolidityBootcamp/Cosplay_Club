const express = require('express');
const router = express.Router();
const fs = require('fs');

/* GET NFT Data. */
router.get('/:id', (req, res, next) => {
  fs.readFile('assets/submissions-data.json', (err, data) => {
    if (err) throw err;
    const submissions = JSON.parse(data);
    const submission = submissions[req.params.id];
    res.json(submission);
  });
})

module.exports = router;
