import ControladorVehiculo from "../controllers/controladorVehiculo";
import ControladorUsuario from "../controllers/controladorUsuario";
import Vista from "../views/vista";
import { verificarEspaciosVacios } from "./utilidades";

document.addEventListener('DOMContentLoaded', () => {
// Esta va a ser la clase principal que me ayuda
// a ejecutar todo el código
class Main{
  constructor() {
    this.controladorVehiculo = new ControladorVehiculo();
    this.controladorUsuario = new ControladorUsuario();
    this.vista = new Vista();
    this.manejarSubmit = this.manejarSubmit.bind(this);
  }

  manejarSubmit(evento) {
    evento.preventDefault();
    // El evento.target hace referencia al elemento html que se le asocio
    // al evento, en este caso cuando la persona le da en ingresar
    // se le asocia todo el formulario
    const formulario = evento.target;

    // El formData nos sirve para traer el valor de los input
    // de un formulario usando su name como llave
    const formdata = new FormData(formulario);

    // el metodo estatico fromEntries nos ayuda para recorrer todos
    // los inputs que se extrayeron del formulario para almacenarlos en un objeto
    const datos = Object.fromEntries(formdata);

    // Destructurando, esto nos permite desempacar las propiedades de un
    // objeto en distintas variables con el mismo nombre las llaves del objeto
    const {
      placa,
      tipoDeVehiculo,
      color,
      marca,
      modelo,
      servicio,
      nombre,
      identificacion,
      celular,
      email,
    } = datos;

    if (verificarEspaciosVacios(datos))
      return;

    const esPlacaValida = this.controladorVehiculo.validarPlaca(placa, tipoDeVehiculo);

    if (!esPlacaValida) return

    // Aquí lo que se hace es guardar la fecha actual con el objeto date
    // con su metodo now que me entrega la fecha en milisegundos
    const horaIngreso = Date.now();

    // Aquí estamos agregando una nueva key al objeto, ingresando el
    // nombre de la nueva key y pasandole el valor de esa key
    datos.horaIngreso = horaIngreso;

    const nuevoVehiculo = this.controladorVehiculo.agregarVehiculo({
      color,
      marca,
      modelo,
      placa,
      servicio,
      tipoDeVehiculo
    })

    if (servicio !== 'hora') {
      const esEmailValido = this.controladorUsuario.validarEmail(email)
      if (!esEmailValido) return

      this.controladorUsuario.agregarUsuario({
        celular,
        email,
        identificacion,
        nombre,
        vehiculoId: nuevoVehiculo.id
      })
    }

    const vehiculos = this.controladorVehiculo.vehiculos
    const usuarios = this.controladorUsuario.usuarios

    console.log({
      vehiculos,
      usuarios
    })

    // Aquí se llama a la función que esta en la vista
    // para que muestre la información en una tabla
    this.vista.mostrarInformacionTabla(vehiculos, usuarios)

/*     this.vista.formulario.reset(); */
  }

  iniciarPrograma() {
    this.vista.inicializarEventoSubmit(this.manejarSubmit);
  }
}

const main = new Main();
// llamamos al Metodo iniciarPrograma del m
main.iniciarPrograma();
})



