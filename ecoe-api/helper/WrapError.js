/**
 * Created by luciabenitez on 3/9/19.
 */
exports.Errors = function (res, error, result) {
  let description;
  let code;

  const errorMysql = "Error en query";

  error = error || 0;
  code = error > 0 ? 400 : 200;


  switch (error) {
    case 0:
      description = "OK";
      break;
    case 1:
      description = "ERROR, usuario no autorizado";
      break;
    case 2:
      description = "ERROR, el usuario ya está registrado";
      break;
    case 3:
      description = "ERROR en la consulta";
      break;
    case 4:
      description = "El usuario no está registrado";
      break;
    case 5:
      description = "Error en el esquema";
      break;
    case 6:
      description = "El usuario ya tiene esa estación asignada";
      break;
    case 7:
      description="El usuario ya ha realizado una evaluación"
      break;
    case "tk1":
      description = "ERROR no existe token";
      break;
    case "tk2":
      description = "ERROR el token no se puede decodificar";
      break;
    case "tk3":
      description = "ERROR el token ha caducado";
      break;

    case 1000:
      description = errorMysql;
      break;

    case 1001:
      description = "No funciona";
      break;




  }
  //console.log(res);
  res
    .status(code)
    .json({
      error : error,
      description: description,
      result: result
    })
};

