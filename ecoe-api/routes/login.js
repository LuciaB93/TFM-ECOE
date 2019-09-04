var express = require('express');
const router = express.Router();

/* GET customer listing. */
router.get('/', function (req, res) {
  res.send('Hello world');
  //console.log(res);
});

router.get('/', (req, res) => res.send('Hello world'));
router.get('/users', (req, res) => res.send([]));
router.post('/users', (req, res) => res.send({ body: req.body}));


/* adds a new customer to the list */
console.log("Hola2");
router.post('/login', async (req, res, next) =>
{
  const body = req.body.username;
  console.log('Ey:' + body);
});

module.exports = router;
