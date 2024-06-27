import { marcasCarros, marcasMotos } from "../JavaScript/constantes";
import { validarPlaca, verificarEspaciosVacios } from "../JavaScript/utilidades";
import Vehiculo from "../models/vehiculoModelo";

// Controller
class ControladorVehiculo {
    constructor (formulario) {
      this.vehiculos = [];
      this.vistaVehiculo = new VistaVehiculo ();
      this.vistaVehiculo.selectTipoVehiculo.addEventListener('change', this.ponerMarcas.bind(this));
      formulario.addEventListener('submit', this.agregarVehiculo.bind(this));
    }

    ponerMarcas(evento){
        const valorSelect = evento.target.value;
        if (valorSelect === "carro"){
          this.vistaVehiculo.mostrarMarcas(marcasCarros);
        } else if (valorSelect === "moto"){
          this.vistaVehiculo.mostrarMarcas(marcasMotos);
        }
    }
    
    agregarVehiculo(evento) {
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
        servicio
      } = datos;
      // Nos saca de la función por si la persona no pone algo y asi no se siga ejecutando todo el código
      if (verificarEspaciosVacios(datos)) return

      // Aquí lo que se hace es guardar la fecha actual con el objeto date
      // con su metodo now que me entrega la fecha en milisegundos
      const horaIngreso = Date.now();

      // Aquí estamos agregando una nueva key al objeto, ingresando el
      // nombre de la nueva key y pasandole el valor de esa key
      datos.horaIngreso = horaIngreso;

      if (!validarPlaca(placa, tipoDeVehiculo)){
        alert("Placa incorrecta, por favor ingresela de nuevo");
        return
      }

      // Se esta creando la instancia de vehiculo para luego agregarlo al array
      const vehiculo = new Vehiculo(placa, tipoDeVehiculo, color, marca, modelo, servicio);

      this.vehiculos.push(vehiculo);
      // Aquí se llama a la función que esta en la vista
      // para que muestre la información en una tabla
      this.vistaVehiculo.mostrarInformacionTabla(this.vehiculos);
      //formulario.reset();
    }
}

export default ControladorVehiculo;