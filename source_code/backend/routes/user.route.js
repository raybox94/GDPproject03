
var express = require('express');
var router = express.Router();
var courseController = require('../controllers/controller.course')
const bodyParser = require('body-parser');
const tokencheck = require('../middleware/tokencheck')
router.use(bodyParser.json());

router.all('*', tokencheck.tokencheck)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('codeword')
});


module.exports = router;
