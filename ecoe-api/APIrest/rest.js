const connection = require("../libs/database");
const User = require("../models/user");
/*const pool = require("../resources/libs/dbPool");
const tk = require("../resources/middleware/checkToken");
const errors = require("../resources/helpers/wrapError");*/

module.exports = function (app) {


  app.post('/login', function (req, res, next) {
    const user = req.body.login;
    const pass = req.body.pass;

    User.login(user, pass, function (error, result) {
      console.log('Estoy en el rest: ');
    })

  });

};
