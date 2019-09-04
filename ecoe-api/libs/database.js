const mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'L23b93s',
  multipleStatements: true,
  database : 'ECOE2'
});

connection.connect(function(error){
  if(error){
    throw error;
  }else{
    console.log('Conexion correcta.');
  }
});

module.exports = connection;






