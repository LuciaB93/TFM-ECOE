const express = require('express');
let router = express.Router();
const connection = require("../libs/database");
const jwt = require("../libs/jwt");
const err = require('../helper/WrapError');
const async = require("async");
/*
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let cors = require('cors');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cookieParser());
router.use(cors());
// Allow CORS (Cross-Origin Requests)
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET, PUT, PATCH, POST, DELETE');
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});*/

/* GET users listing.
router.get('/', function(req, res, next) {
  res.json();
});
*/

let multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'ecoe-api/fotos')
  }, filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});


let upload = multer({storage: storage}).single('file');


router.post('/login', async (req, res, next) => {

  //const body = req.body.username;
  //console.log('Ey:' + body);
  const DNI = req.body.DNI;
  const pass = req.body.password;
  console.log('Ey' + DNI  + '  ' + pass);

  try {
    login(DNI, pass, function (error, result) {
      if (error) err.Errors(res, error);
      else err.Errors(res, error, {data: result});
    });
  }catch (error){
    console.error(error);
  }

  function login (DNI, pass, callback){

    connection.query('SELECT ID,nombre FROM usuario where DNI=? and pass=? and deleted=0', [DNI, pass], function (error, results) {
      if (error) {
        callback(1000);
      }
      else {
        //Si el usuario está logueado.
        if (results.length === 0)
          return callback(4);


        let id = results[0].ID;
        let nombre = results[0].nombre;
        let token = jwt.encode(id);


        console.log(jwt.decode(token).sub);
        let query = 'SELECT count(*) alum from alumno where ID=? and deleted=0;' +
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

  }
});

router.post('/subject', function (req, res, next) {
  connection.query('Select * from subject;', function (error, result) {
    if (error)
      err.Errors(res, error);
    else {
      err.Errors(res, error, {data: result});
    }
  })
});

router.post('/competencias', function (req, res, next) {
  connection.query('Select * from clasificacionECOE;', function (error, result) {
    if (error)
      err.Errors(res, error);
    else {
      err.Errors(res, error, {data: result});
    }
  })
});

router.post('/categorias', function (req, res, next) {
  connection.query('Select * from categoria;', function (error, result) {
    if (error)
      err.Errors(res, error);
    else {
      err.Errors(res, error, {data: result});
    }
  })
});

router.post('/newPregunta', async (req, res, next) => {
  const descripcion = req.body.descripcion;
  const pregunta = req.body.pregunta;
  const respuestas = req.body.respuestaList;
  const subject = req.body.materia;
  const type = req.body.type;

  console.log('Lista de respuestas: ' + respuestas);
  console.error(req.body);
  //const imagen=req.body.file;
  //const respuestaCorrect = req.body.respuestaCorrecta;

    newPregunta(descripcion, pregunta, respuestas, subject, type, function (error, result) {
      if (error) err.Errors(res, error);
      //else err.Errors(res, error, result);
    });

  function newPregunta (descripcion, pregunta, respuestas, subject, type, callback) {
    connection.query('Insert into indicador(nombre,descripcion) values(?,?)', [pregunta, descripcion], function (error, result) {
      if (error)
        callback(1000);
      else {
        //console.log("CORRECTO")
        //callback(0);
        connection.query('select ID_indicador from indicador where nombre=? and deleted=0', [pregunta], function (error, result) {
          if (error)
            callback(1000);
          else {
            let id = result[0].ID_indicador;
            connection.query('insert into competencia(nombre, descripcion,ID_type,ID_indicador,ID_subject) values(?,?,?,?,?)', [pregunta, descripcion, type, id, subject], function (error, result) {
              if (error) callback(1000);
              else console.log("insertado en competencia")
            });


            // BORRAR HASTA AQUI
            console.log(respuestas);
            for (let i = 0; i < respuestas.length; i++) {
              let respuesta = respuestas[i];
              connection.query('Insert into opciones(name, ID_indicador) values(?,?)', [respuesta, id], function (error, result) {
                if (error)
                  callback(1000);
                /*else {
                 connection.query('select ID_opcion from opciones where name=? and ID_indicador=? and deleted=0', [correcta,id], function (error, result) {
                 if (error)
                 callback(1000);
                 else {
                 let id_op = result[0].ID_opcion;
                 //console.log(correcta);
                 //console.log(id_op);
                 /*connection.query('Insert into respuestasCorrectas(name,ID_opcion) values(?,?)', [correcta, id_op], function (error, result) {
                 if (error)
                 callback(1000)
                 })

                 //callback(0);
                 }


                 })

                 } // Aqui estaba cerrado el comentario*/

              })
            }//Cierre del bucle for
            //callback(0);
          }
        });
        callback(0);
      }
    })
  }
});

router.post('/correctas', function (req, res, next) {
  const correcta = req.body.respuestaOk;
  const respuestas = req.body.respuestaList;

  console.log(correcta);
  //console.log(respuestas);

  correctas(respuestas, correcta, function (error, result) {
    if (error) err.Errors(res, error);
    else err.Errors(res, error, result);
  });

  function correctas(respuestas, correcta, callback){
    for (let i = 0; i < respuestas.length; i++) {
      let respuesta = respuestas[i];
      if (respuesta === correcta)
        connection.query('select ID_opcion from opciones where name=? and deleted=0', [correcta], function (error, result) {
          if (error)
            callback(1000);
          else {
            let id_op = result[0].ID_opcion;
            connection.query('Insert into respuestasCorrectas(name,ID_opcion) values(?,?)', [correcta, id_op], function (error, result) {
              if (error)
                callback(1000);
              else
                callback(0)
            })
          }
        })
    }
  }
});

router.post('/upload', upload, function (req, res, next) {
  const nombre = req.body.nombre;
  const nombreI = req.file.filename;

  connection.query('update indicador set imagen=? where nombre=? and deleted=0', ['/fotos/' + nombreI, nombre], function (error, result) {
    if (error) err.Errors(res, error);
    //else err.Errors(res, error, result);
  })

});

router.post('/addCasoClinico', function (req, res, result) {
  const descripcion = req.body.descripcion;
  const items = req.body.item;
  const subject = req.body.materia;
  const type = req.body.tipo;

  addCasoClinico (descripcion, items, subject, type, function (error, result) {
    if (error) err.Errors(res, error);
    else err.Errors(res, error, result);
  });

  function addCasoClinico (descripcion, items, subject, type, callback) {
    let id_sub;
    //let compes =[]
    //compes=competencias;

    for (let i = 0; i < items.length; i++) {
      let item = items[i];

      connection.query('Insert into indicador(nombre, descripcion) values(?,?)', [item, descripcion], function (error, result) {
        if (error)
          callback(1000);
        else {
          console.log("Insertado en el indicador")
        }
      })
    }
    for (let i = 0; i < items.length; i++) {
      let item = items[i];


      connection.query('select ID_indicador,nombre from indicador where nombre=? and deleted =0', [item], function (error, result) {
        if (error)
          callback(1000);
        else {
          let id_in = result[0].ID_indicador;
          let nom = result[0].nombre;

          connection.query('insert into competencia(nombre, descripcion,ID_type, ID_Indicador, ID_subject) values(?,?,?,?,?)', [nom, descripcion, type, id_in, subject], function (error, result) {
            if (error)
              callback(1000);
            else {
              console.log("INSERTADO en competencias")

            }
          })

        }

      })


    }

    callback(0);
  }
});

router.post('/addCompetencia', function (req, res, next) {
  const nombre = req.body.item;
  const competencia = req.body.competencia;
  const categoria = req.body.categoria;
  const peso = req.body.peso;

  //console.log(nombre);

  addCompetencia(nombre, competencia, categoria, peso, function (error, result) {
    if (error) err.Errores(res, error);
    else err.Errores(res, error, result);
  });

  function addCompetencia(nombre, competencia, categoria, peso, callback) {
    let compe;
    let item;
    let cate;
    let id_c;
    let j = 0;
    let pes;

    for (let i = 0; i < nombre.length; i++) {
      item = nombre[i];
      // console.log(item)
      connection.query('select ID_indicador from indicador where nombre=? and deleted=0', [item], function (error, result) {
        if (error) callback(1000)
        else {
          id_c = result[0].ID_indicador
          //console.log(id_c)
        }

        compe = competencia[j];
        pes = peso[j];
        console.log(peso)
        connection.query('update competencia set ID_dominio=?,peso=? where ID_indicador=? and deleted=0', [compe, pes, id_c], function (error, result) {
          if (error) callback(1000)
          else console.log("ACTUALIZADO dominio y peso")
        })

        cate = categoria[j];
        connection.query('update competencia set ID_categoria=? where ID_indicador=? and deleted=0', [cate, id_c], function (error, result) {
          if (error) callback(1000)
          else {
            console.log("ACTUALIZADA Categoria")
          }
        })

        j++;

      })


    }

    callback(0);
  }
});

router.post('/informe', function (req, res, next) {

  const descripcion = req.body.puntoPartida;
  const pesos = req.body.peso;
  const respuestas = req.body.respuestas;
  const type = req.body.tipo;
  const subject = req.body.materia;

  //console.log(listado)
  addInforme(descripcion, pesos, respuestas, type, subject, function (error, result) {
    if (error) err.Errors(res, error);
    else err.Errors(res, error, result);
  });

  function addInforme(descripcion, pesos, respuestas, type, subject, callback) {
    let item;
    let id_sub = subject;
    let j = 0;
    let peso;
    //let compes =[]
    //compes=competencias;
    //console.log(pesos)

    for (let i = 0; i < respuestas.length; i++) {
      item = respuestas[i];
      console.log(item);
      connection.query('insert into indicador(nombre,descripcion) values(?,?)', [item, descripcion], function (error, result) {
        if (error) callback(1000);
        else {
          console.log('Insertado en indicador.')
        }
      })
    }

    for (let i = 0; i < respuestas.length; i++) {
      let item = respuestas[i];

      connection.query('select ID_indicador,nombre from indicador where nombre=? and deleted=0', [item], function (error, result) {
        if (error) callback(1000)
        else {
          let id_in = result[0].ID_indicador;
          let nom = result[0].nombre;

          peso = pesos[j];
          console.log(peso);
          connection.query('insert into competencia(nombre, descripcion,ID_type, ID_Indicador, ID_subject,peso) values(?,?,?,?,?,?)', [nom, descripcion, type, id_in, id_sub, peso], function (error, result) {
            if (error)
              callback(1000);
            else {
              console.log("INSERTADO en competencias")
            }
          })
          j++;

        }

      })

    }
    callback(0);
  }

});

router.post('/insertCategoria', function (req, res, next) {
  const categoria = req.body.pregunta;
  const respuestas = req.body.respuestas;
  const competencias = req.body.competencias;


  insertCategoria(categoria, respuestas, competencias, function (error, result) {
    if (error) err.Errors(res, error);
    else err.Errors(res, error, result);
  });

  function insertCategoria(categoria, respuestas, competencias, callback) {
    let id_cat;
    let id_dom;
    console.log(competencias);


    let query = 'select ID_categoria from categoria where nombre=? and deleted=0';
    connection.query(query, [categoria], function (error, result) {
      if (error) callback(1000);
      else {
        if (result.length == 0) {
          connection.query('insert into categoria(nombre) values(?)', [categoria], function (error, result) {
            if (error) callback(1000);
            else {
              console.log("Insertado en categoria")
              connection.query(query, [categoria], function (error, result) {
                if (error) callback(1000)
                else {
                  id_cat = result[0].ID_categoria;
                  //console.log(id_cat)
                  console.log(id_cat)
                  for (let i = 0; i < respuestas.length; i++) {
                    let item = respuestas[i];
                    id_dom = competencias[i];
                    console.log(id_dom)
                    console.log(id_cat)

                    connection.query('update competencia set ID_categoria=?,ID_dominio=? where nombre=? and deleted=0', [id_cat, id_dom, item], function (error, result) {
                      if (error) callback(1000);
                      else console.log("Competencia Actualizada")
                    })
                  }
                }
              })
            }

          })
        }
        else {
          id_cat = result[0].ID_categoria;
          //console.log(id_cat)
          console.log(id_cat)
          for (let i = 0; i < respuestas.length; i++) {
            let item = respuestas[i];
            id_dom = competencias[i];
            console.log(id_dom)


            connection.query('update competencia set ID_categoria=?,ID_dominio=? where nombre=? and deleted=0', [id_cat, id_dom, item], function (error, result) {
              if (error) callback(1000);
              else console.log("Competencia Actualizada")
            })
          }
        }

      }

    })

    callback(0);

  }


});

router.post('/listaCompetencias', function (req, res, next) {
  const materia = req.body.materia;
  console.log(materia);
  connection.query('select * from competencia where ID_subject =? and deleted=0', [materia], function (error, result) {
    if (error) err.Errores(res, error);
    else {
      err.Errors(res, error, {data: result});
    }
  })
});

router.post('/deleteQuestion', function (req, res, next) {
  const id = req.body.ID;
  console.log(id);
  deleteQuestion(id, function (error, result) {
    if (error) err.Errors(res, error)
    else err.Errors(res, error, result);
  });
  function deleteQuestion(id, callback) {
    connection.query('Select nombre from competencia where ID_competencia=? and deleted=0', [id], function (error, result) {
      if (error) callback(1000)
      else {
        console.log(id);
        if (result.length == 0)
          callback(4);
        else {
          connection.query('update competencia set deleted=1 where ID_competencia=?', [id], function (error, result) {
            if (error) callback(1000);
            else callback(0);
          })
        }
      }
    })
  }
});

router.post('/registrar', function (req, res, next) {
    const DNI = req.body.DNI;
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const email = req.body.email;
    const pass = req.body.password;
    const rol = req.body.rolSelected;

    registrar(DNI, nombre, apellidos, email, pass, rol, function (error, result) {
      if (error) err.Errors(res, error);
      else err.Errors(res, error, result);
    });

    function registrar(DNI, nombre, apellidos, email, pass, rol, callback) {
      //console.log("hola 1")

      //let id=jwt.decode(token).sub;
      //connection.query('select ID from coordinador where ID=? and deleted=0',[])
      connection.query('SELECT ID,nombre FROM usuario where DNI=? and deleted=0', [DNI], function (error, results) {
        if (error)
          callback(1000);
        else {
          //si el usuario existe es porque ya está registrado.
          if (results.length == 1)
            callback(2);
          else {
            connection.query('insert into usuario(DNI, pass, nombre, apellidos, email) values(?,?,?,?,?)',
              [DNI, pass, nombre, apellidos, email], function (error, result) {
                if (error)
                  callback(1000);
                else {//se inserta en usuario
                  console.log("insertado en usuario");
                  //callback(0);
                  connection.query('Select ID FROM usuario where DNI=? and deleted=0', [DNI], function (error, results) {
                    if (error)
                      callback(1001);
                    else {
                      let ID = results[0].ID;
                      console.log(ID);
                      if (rol === 'Alumno')
                        connection.query('insert into alumno(ID) select ID from usuario where ID=?', [ID], function (error, result) {
                          if (error)
                            callback(1000);
                          else {
                            console.log("insertado en alumno");
                            //callback(0)
                          }
                        });
                      if (rol === 'Profesor')
                        connection.query('insert into profesor(ID) select ID from usuario where ID=?', [ID], function (error, result) {
                          if (error)
                            callback(1000);
                          else {
                            console.log("insertado en profesor");
                            //callback(0)
                          }
                        });
                      if (rol === 'Coordinador')
                        connection.query('insert into coordinador(ID) select ID from usuario where ID=?', [ID], function (error, result) {
                          if (error)
                            callback(1000);
                          else {
                            console.log("insertado en coordinador");
                            //callback(0)
                          }
                        });
                      if (rol === 'Actor')
                        connection.query('insert into actor(ID) select ID from usuario where ID=?', [ID], function (error, result) {
                          if (error)
                            callback(1000);
                          else {
                            console.log("insertado en actor");
                            //callback(0)
                          }
                        })
                    }
                  });

                  callback(0);
                }
              })
          }

        }

      })
    }
});

router.post('/listaAllUser', function (req, res, next) {
  connection.query('SELECT * from usuario', function (error, result) {
    if (error) err.Errors(res, error);
    else err.Errors(res, error, {data: result})
  })
});

router.post('/listausuario', function (req, res, next) {
  const rol = req.body.rol;

  /*User.usuarios(alumno,profesor,coordinador,actor, function (error, result) {
   if (error) err.Errores(res, error);
   else err.Errores(res, error, {data: result})
   })*/

  if (rol === 'Alumno') {
    connection.query('SELECT u.ID, u.DNI, u.nombre, u.apellidos, u.email from ECOE2.usuario u  INNER JOIN ECOE2.alumno a ON u.ID=a.ID where u.deleted=0 and a.deleted=0 ', function (error, result) {
      if (error)
        err.Errors(res, error);
      else {
        err.Errors(res, error, {data: result});
      }
    })
  }
  else if (rol === 'Profesor') {
    connection.query('SELECT u.ID, u.DNI, u.nombre, u.apellidos, u.email from ECOE2.usuario u INNER JOIN ECOE2.profesor p ON u.ID=p.ID where u.deleted=0 and p.deleted=0', function (error, result) {
      if (error)
        err.Errors(res, error);
      else {
        err.Errors(res, error, {data: result})
      }
    })
  }
  else if (rol === 'Coordinador') {
    connection.query('SELECT u.ID, u.DNI, u.nombre, u.apellidos, u.email from ECOE2.usuario u INNER JOIN ECOE2.coordinador c ON u.ID=c.ID where u.deleted=0 and c.deleted=0', function (error, result) {
      if (error)
        err.Errors(res, error);
      else {
        err.Errors(res, error, {data: result})
      }
    })
  }
  else if (rol === 'Actor') {
    connection.query('SELECT u.ID, u.DNI, u.nombre, u.apellidos, u.email from ECOE2.usuario u INNER JOIN ECOE2.actor ac ON u.ID=ac.ID where u.deleted=0 and ac.deleted=0', function (error, result) {
      if (error)
        err.Errors(res, error);
      else {
        err.Errors(res, error, {data: result})
      }
    })
  }


});

router.post('/deleteUser', function (req, res, next) {
  const ID = req.body.ID;
  const rol = req.body.rol;

  console.log(ID);
  console.log(rol);
  eliminar(ID, rol, function (error, result) {
    if (error) err.Errors(res, error);
    else err.Errors(res, error, result);
  });

  function eliminar(ID, rol, callback) {
    connection.query('Select DNI from usuario where ID=? and deleted = 0', [ID], function (error, results) {
      if (error)
        callback(1000);
      else {
        if (results.length == 0)
          callback(4);
        else {
          connection.query('Update usuario set deleted = 1 where ID=?', [ID], function (error, results) {
            if (error)
              callback(1000);
            else {
              if (rol === 'Alumno') {
                connection.query('update alumno set deleted=1 where ID=?', [ID], function (error, results) {
                  if (error)
                    callback(1000);
                  else {
                    console.log("Usuario eliminado de Alumno");
                    callback(0)
                  }
                })
              }
              if (rol === 'Profesor') {
                connection.query('update profesor set deleted=1 where ID=?', [ID], function (error, results) {
                  if (error)
                    callback(1000);
                  else {
                    console.log("Usuario eliminado de profesor");
                    callback(0)
                  }
                })
              }
              if (rol === 'Coodinador') {
                connection.query('update coordinador set deleted=1 where ID=?', [ID], function (error, results) {
                  if (error)
                    callback(1000)
                  else {
                    console.log("Usuario eliminado de coordinador")
                    callback(0)
                  }
                })
              }
              if (rol === 'Actor') {
                connection.query('update actor set deleted=1 where ID=?', [ID], function (error, results) {
                  if (error)
                    callback(1000)
                  else {
                    console.log("Usuario eliminado de actor")
                    callback(0)
                  }
                })
              }
            }

          })
        }
      }
    })
  }

});

router.post('/listaProfesores', function (req, res, next) {
  connection.query('SELECT  u.nombre, u.apellidos,u.DNI,u.ID from ECOE2.usuario u JOIN ECOE2.profesor p ON u.ID=p.ID where u.deleted=0 and p.deleted=0', function (error, result) {
    if (error) err.Errors(res, error);
    else err.Errors(res, error, {data: result})
  })
});

router.post('/listaAlumnos', function (req, res, next) {
  connection.query('SELECT  u.nombre, u.apellidos,u.DNI,u.ID from ECOE2.usuario u JOIN ECOE2.alumno p ON u.ID=p.ID where u.deleted=0 and p.deleted=0', function (error, result) {
    if (error) err.Errors(res, error);
    else err.Errors(res, error, {data: result})
  })
});

router.post('/crearGrupo', function (req, res, next) {
  const nombreG=req.body.nombre;
  const anio = req.body.anio;
  const profesor = req.body.profesor;
  const alumnos = req.body.alumnos;

  connection.query('insert into grupo(nombre_grupo, ID_profesor, anio_convocatoria) values(?,?,?)',[nombreG, profesor, anio],function (error, result) {
    if(error)  err.Errors(res, error);
    else{
      connection.query('select ID_grupo from grupo where nombre_grupo=? and deleted=0',[nombreG],function (error, result) {
        if(error) err.Errors(res, error);
        else{
          let id_g = result[0].ID_grupo;
          connection.query('insert into profesorGrupo(ID_grupo,ID_profesor) values(?,?)',[id_g,profesor],function (error, result) {
            if(error) err.Errors(res, error);
            else console.log('insertado en profesorGrupo')
          });
          async.each(alumnos, function (item, callback) {
            connection.query('insert into alumnoGrupo( ID_alumno,ID_grupo) values(?,?)',[item.ID,id_g],function (error, result) {
              if(error) callback(error, null);
              else{
                console.log("Insertado en alumnoGrupo");
                callback(null, result);
              }
            })
          },function (error) {
            if(error) err.Errors(res, error);

          })

        }
        err.Errors(res, error,  result);
        // callback(0)
      })
    }
  })
});

router.post('/listarGrupos', function (req, res, next) {
    connection.query('Select g.nombre_grupo, g.ID_grupo, g.anio_convocatoria,u.nombre,u.apellidos from grupo  g JOIN usuario u ON u.ID=g.ID_profesor  where g.deleted=0 and u.deleted=0 ',function (error, result) {
      if(error) err.Errors(res, error);
      else {
        //console.log(result)
        err.Errors(res, error, {data: result})
      }
    })
});

router.post('/listaAlumnosGrupo', function(req, res, next) {
  connection.query('select ag.ID_alumno,ag.ID_grupo,u.nombre, u.apellidos from alumnoGrupo ag JOIN usuario u ON u.ID=ag.ID_alumno JOIN grupo g  where ag.deleted=0 and g.deleted=0 and u.deleted=0 and g.ID_grupo = ag.ID_grupo',function (error, result) {
    if(error) err.Errors(res, error);
    else err.Errors(res, error, {data: result})

  })
});

router.post('/deleteGroup', function (req, res, next) {
  const ID = req.body.ID;
  connection.query('update alumnoGrupo set deleted=1 where ID_grupo=? and deleted=0',[ID],function (error, result) {
    if(error)  err.Errores(res, error);
    else{
      connection.query('update profesorGrupo set deleted=1 where ID_grupo=? and deleted=0',[ID],function (error, result) {
        if(error) err.Errores(res, error);
        else{
          connection.query('update grupo set deleted=1 where ID_grupo=? and deleted=0',[ID],function (error, result) {
            if(error) err.Errores(res, error);
          })
        }
      });
      err.Errors(res, error,result)
    }
  })
});

router.post('/listaActores', function (req, res, next) {
  connection.query('SELECT u.ID, u.DNI, u.nombre, u.apellidos, u.email from ECOE2.usuario u INNER JOIN ECOE2.actor ac ON u.ID=ac.ID where u.deleted=0 and ac.deleted=0', function (error, result) {
    if (error)
      err.Errors(res, error);
    else {
      err.Errors(res, error, {data: result})
      //console.log(result.length);
    }
  })
});

router.post('/listaCompetenciasTipo', function (req, res, next) {
  const materia = req.body.materia;
  const type = req.body.tipo;
  //console.log(materia);
  connection.query('select * from competencia where ID_subject =? and ID_type=? and deleted=0', [materia, type], function (error, result) {
    if (error) err.Errors(res, error);
    else {
      err.Errors(res, error, {data: result});
    }
  })
});

router.post('/crearEstacion', function (req, res, next) {
  const numero = req.body.numero;
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;
  const partida = req.body.partida;
  const tipo = req.body.tipo;
  const pass = req.body.pass;
  const peso = req.body.peso;
  const actor = req.body.actor;
  const listaProfC = req.body.profesoresC;


  //console.log(nombre);
  crearEstacion(numero, nombre, descripcion, partida, tipo, actor,pass,peso, listaProfC, function (error, result) {
    if (error) err.Errors(res, error);
    else err.Errors(res, error, result);
  });

  function crearEstacion(numero, nombre, descripcion, partida, tipo, actor, pass, peso, listaProfC, callback) {
    connection.query('insert into estacion(numero_estacion,nombre,descripcion,situacion_partida,tipo_estacion,ID_actor,pass,peso) values (?,?,?,?,?,?,?,?)', [numero, nombre, descripcion, partida, tipo, actor, pass, peso], function (error, result) {
      if (error) {
        console.log("ERROR");
        callback(1000);
      }
      else {
        console.log('Estacion Creada');
        connection.query('select ID_estacion from estacion where nombre=? and deleted=0', [nombre], function (error, result) {
          if (error) callback(1000);
          else {
            let ID_esta = result[0].ID_estacion;
            //console.log(ID_esta);
            if (listaProfC !== undefined) {
              for (let i = 0; i < listaProfC.length; i++) {
                let id = listaProfC;
                console.log(ID_esta);
                console.log(id);
                connection.query('insert into profesorEstacion(ID_profesor,ID_estacion) values(?,?)', [id, ID_esta], function (error, result) {
                  if (error) callback(1000);
                  else {
                    console.log("Insertados Profesores Complementarios");
                  }
                })
              }
            }
            if (actor !== undefined) {
              connection.query('update actor set estacion_asignada=? where ID=? and deleted=0', [ID_esta, actor], function (error, result) {
                if (error) callback(1000);
                else {
                  console.log('Actor actualizado.')
                }
              })
            }
          }
        });
        callback(0);
      }
    })
  }
});

router.post('/creaPreguntaEcoe', function (req, res, next) {
  const listaItem = req.body.items;
  const nombre = req.body.nombre;

  creaPreguntaEcoe(nombre, listaItem, function (error, result) {
    if (error) err.Errors(res, error);
    else err.Errors(res, error, result);
  });

  function creaPreguntaEcoe(nombre, listaItem, callback) {
    let id_estacion;
    connection.query('select ID_estacion from estacion where nombre=? and deleted=0', [nombre], function (error, result) {
      if (error) callback(1000);
      else {
        id_estacion = result[0].ID_estacion;


        for (let i = 0; i < listaItem.length; i++) {
          let item = listaItem[i].nombre;
          let peso = listaItem[i].peso;
          let id_com = listaItem[i].ID_competencia;

          //console.log(item);

          connection.query('insert into pregunta(ID_competencia, ID_estacion,peso) values(?,?,?)', [id_com, id_estacion, peso], function (error, result) {
            if (error) callback(1000);
            else {
              console.log("Insertado en pregunta");
            }
          })
        }
      }
      //console.log(id_estacion);
      callback(0);

    })


  }
});

router.post('/gruposEstacion', function (req, res, next) {
  const grupos= req.body.grupos;
  const estacion = req.body.estacion;

  gruposEstacion(grupos, estacion, function (error, result) {
    if (error) err.Errors(res, error);
    else err.Errors(res, error, result);
  });

  function gruposEstacion(grupos, estacion, callback) {
    let id_estacion;
    connection.query('select ID_estacion from estacion where nombre=? and deleted=0', [estacion], function (error, result) {
      if (error) callback(1000);
      else {
        id_estacion = result[0].ID_estacion;

        for (let i = 0; i < grupos.length; i++) {
          let profe = grupos[i].ID_profesor;
          let id_g = grupos[i].ID_grupo;

          console.log(profe);
          connection.query('update profesorGrupo set ID_estacion=? where ID_profesor=? and deleted=0', [id_estacion, profe], function (error, result) {
            if (error) callback(1000);
            else {
              console.log("profesorGrupo Actualizado")
            }
          });

          connection.query('select ag.ID_alumno,ag.ID_grupo from alumnoGrupo ag  JOIN grupo g  where ag.deleted=0 and g.deleted=0 and g.ID_grupo = ag.ID_grupo and g.ID_grupo = ? ', [id_g], function (error, result) {
            if (error) callback(1000);
            else {
              for (let j = 0; j < result.length; j++) {
                let id_a = result[j].ID_alumno;
                let id_gru = result[j].ID_grupo
                connection.query('insert into alumnoEstacion(ID_alumno, ID_estacion,ID_grupo) values(?,?,?)', [id_a, id_estacion, id_gru], function (error, result) {
                  if (error) callback(1000);
                  else {
                    console.log("insertado en alumnoEstacion")
                  }
                })
              }
            }
          })
        }

        callback(0);
      }
    })
  }
});

router.post('/listarEstaciones', function (req, res, next) {
  connection.query('Select * from estacion where deleted=0', function (error, result) {
    if (error) err.Errors(res, error);
    else err.Errors(res, error, {data: result});
  })
});

router.post('/listaAlumnosGrupo', function (req, res, next) {
  connection.query('select ag.ID_alumno,ag.ID_grupo,u.nombre, u.apellidos from alumnoGrupo ag JOIN usuario u ON u.ID=ag.ID_alumno JOIN grupo g  where ag.deleted=0 and g.deleted=0 and u.deleted=0 and g.ID_grupo = ag.ID_grupo',function (error, result) {
    if(error) err.Errors(res, error);
    else err.Errors(res, error, {data: result})
  })
});

router.post('/asignarAlumno', function (req, res, next) {
  const estacion = req.body.estacion;
  const grupos = req.body.grupos;

  asignarAlumno(estacion, grupos, function (error, result) {
    if (error) err.Errors(res, error);
    else err.Errors(res, error, result);
  });

  function asignarAlumno(estacion, grupos, callback) {
    for (let i = 0; i < grupos.length; i++) {
      let id_g = grupos[i].ID_grupo;

      connection.query('select ID_alumno from alumnoGrupo where ID_grupo=? and deleted=0', [id_g], function (error, result) {
        if (error) callback(1000);
        else {
          for (let j = 0; j < result.length; j++) {
            let alum = result[j].ID_alumno;
            connection.query('insert into alumnoEstacion(ID_alumno,ID_estacion,ID_grupo) values(?,?,?)', [alum, estacion, id_g], function (error, result) {
              if (error) callback(1000)
            })
          }
        }
      })
    }
    callback(0);
  }
});

router.post('/listaEstacionesMod', function (req, res, next) {
  connection.query('select e.ID_estacion,e.numero_estacion,e.nombre,e.descripcion,e.peso,u.nombre as actor,g.nombre_grupo as grupo from estacion e JOIN usuario u JOIN grupo g JOIN profesorGrupo pg ON pg.ID_grupo=g.ID_grupo where u.ID = e.ID_actor and g.deleted=0 and u.deleted=0 and e.deleted=0 and pg.deleted=0',function (error, result) {
    if(error) err.Errors(res, error);
    else err.Errors(res, error, {data: result })
  })
});

router.post('/eliminarEstacion', function (req, res, next) {
  const id = req.body.ID;
  console.log(id);

  connection.query('select ID_estacion,ID_titulacion,ID_actor from estacion where ID_estacion=?',[id],function (error, result) {
    if(error) err.Errors(res, error);
    else{
      let id_t = result[0].ID_titulacion;
      let id_ac = result[0].ID_actor;

      connection.query('update titulacion set deleted=1 where ID_titulacion=?',[id_t], function (error, result) {
        if(error) err.Errors(res, error);
      })
      connection.query('update alumnoEstacion set deleted=1 where ID_estacion=?',[id], function (error, result) {
        if(error) err.Errors(res, error);
      })
      connection.query('update profesorEstacion set deleted=1 where ID_estacion=?',[id], function (error, result) {
        if(error) err.Errors(res, error);
      })
      connection.query('update pregunta set deleted=1 where ID_estacion=?',[id], function (error, result) {
        if(error) err.Errors(res, error);
      })
      connection.query('update actor set deleted=1 where ID=?',[id_ac], function (error, result) {
        if(error) err.Errors(res, error);
      })
      connection.query('update estacion set deleted=1 where ID_estacion=?',[id],function (error, result) {
        if(error) err.Errors(res, error);
      })

    }
    err.Errors(res, error, result)

  })

})

module.exports = router;

