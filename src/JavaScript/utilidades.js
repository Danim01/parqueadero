/* El import sirve para traer la información de otro archivo
  le tengo que escribir import y si estoy exportando un objeto
  entre {} escribo las variables que voy a utilizar y luego de ello escribir 
  from y entre "" la ruta del archivo que tiene la información que quiero exportar */
/* import { regexpPlacaCarro, regexpPlacaMoto } from "./constantes.js" */

function verificarEspaciosVacios(datos){
  let inputVacio = false;

  // Esto lo que hace es recorrer cada una de las llaves con su valor
  // Entries sirve para generar un arreglo de arreglos, es decir me va 
  // a agregar cada una de mis keys en un array, cada key por separado en un array 
  Object.entries(datos).forEach(entry => {
    const [llave, valor] = entry;

    // EL metodo trim lo que hace es quitar los espacios al inicio y al
    // final de esta manera lo que hace es saber si el input esta vacío,
    //esto se hace para evitar que la persona solo ponga un espacio
    // en el input ya que los espacios son contamos como caracteres
    if (valor.trim() === "") {
      // toUpperCase sirve para poner todo el string en mayúscula 
      alert(`El campo ${llave.toUpperCase()} es requerido`)
      inputVacio = true;
    }

  });
  return inputVacio;
}

// función para convertir las fechas a algo que entienda mysql
function dateTimeForMysql(date) {
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

/* El export sirve para exportar la información que yo quiera utilizar en otros archivos
  si son varias variables las que quiero exportar las guardo en un objeto, pero si solo 
  es una se exporta así: export default y el nombre de la variable */
export {
    verificarEspaciosVacios,
    dateTimeForMysql
}