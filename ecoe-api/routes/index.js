var express = require('express');
const router = express.Router();

/* GET customer listing. */
router.get('/*', (req, res) => res.render(
  './index'));
console.log("Hola");
module.exports = router;
