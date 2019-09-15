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

  static newPregunta(descripcion, pregunta, respuestas, correcta, subject, type, callback) {
    connection.query('Insert into indicador(nombre,descripcion) values(?,?)', [pregunta, descripcion], function (error, result) {
      if (error)
        callback(1000)
      else {
        //console.log("CORRECTO")
        //callback(0);
        connection.query('select ID_indicador from indicador where nombre=? and deleted=0', [pregunta], function (error, result) {
          if (error)
            callback(1000);
          else {
            var id = result[0].ID_indicador;
            /*COSAS NUEVAS, BORRAR SI SE ROMPE*/
            connection.query('select ID_subject from subject where nombre=? and deleted =0 ', [subject], function (error, result) {
              if (error)
                callback(1000)
              else {
                var id_materia = result[0].ID_subject;
                connection.query('insert into competencia(nombre, descripcion,ID_type,ID_indicador,ID_subject) values(?,?,?,?,?)', [pregunta, descripcion, type, id, id_materia], function (error, result) {
                  if (error) callback(1000)
                  else console.log("insertado en competencia")
                })
              }

            })
            /*BORRAR HASTA AQUI*/
            for (var i = 0; i < respuestas.length; i++) {
              var respuesta = respuestas[i];
              connection.query('Insert into opciones(name, ID_indicador) values(?,?)', [respuesta, id], function (error, result) {
                if (error)
                  callback(1000);
                /*else {
                 connection.query('select ID_opcion from opciones where name=? and ID_indicador=? and deleted=0', [correcta,id], function (error, result) {
                 if (error)
                 callback(1000);
                 else {
                 var id_op = result[0].ID_opcion;
                 //console.log(correcta);
                 //console.log(id_op);
                 /*connection.query('Insert into respuestasCorrectas(name,ID_opcion) values(?,?)', [correcta, id_op], function (error, result) {
                 if (error)
                 callback(1000)
                 })

                 //callback(0);
                 }


                 })

                 }*/

              })
            }//Cierre del bucle for
            //callback(0);
          }
        })
        callback(0);
      }
    })
  }
}
