
const jwt = require("jwt-simple");
const moment = require('moment');
const secret="bola";

exports.encode = function (payload) {
  const now = moment.utc();
  const expirateTime = now.add(1,"h");
  var exp = expirateTime.valueOf();

  return jwt.encode({
    exp:exp,
    sub:payload
  },secret);
};

exports.decode =  function(token){
  try{
    return jwt.decode(token,secret);
  }catch(error) {
    console.log("error de autentificacion");
    return null;
  }
};
