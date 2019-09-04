var connection = require('../libs/database');
var jwt = require('../libs/jwt');
//const nodemailer = require('nodemailer');

class User {
  static login(DNI, pass, callback) {
    connection.query('SELECT ID,nombre FROM usuario where DNI=? and pass=? and deleted=0', [DNI, pass], function (error, results) {
      if (error) {
        callback(1000);
      }
      else {
        //Si el usuario está logueado.
        if (results.length == 0)
          return callback(4);


        var id = results[0].ID;
        var nombre = results[0].nombre;
        let token = jwt.encode(id);


        console.log(jwt.decode(token).sub);
        var query = 'SELECT count(*) alum from alumno where ID=? and deleted=0;' +
          'SELECT count(*) coordi from coordinador where ID=? and deleted=0;' +
          'SELECT count(*) profe from profesor where ID=? and deleted=0;' +
          'SELECT count(*) actor from actor where ID=? and deleted=0';


        connection.query(query, [id, id, id, id], function (error, result) {
          if (error) {
            console.log('error');
            callback(1000);
          }
          else {
            let alum = result[0][0].alum;
            let coordi = result[1][0].coordi;
            let profe = result[2][0].profe;
            let actor = result[3][0].actor;

            //console.log(actor);
            //console.log(alum);


            callback(null, {
              ID: id,
              nombre: nombre,
              token: token,
              roles: {
                alum: alum,
                coordinador: coordi,
                profesor: profe,
                actor: actor
              }


            })

          }

        })


      }
      //{token: jwt.encode({"tipo": "tipo"})};
      //console.log(result);
      //res.json(err.Errores(0, {token: jwt.encode({"tipo": "tipo"})}));


    });
  } // Fin del método login


}
