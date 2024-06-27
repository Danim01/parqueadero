import { marcasCarros, marcasMotos, regexpPlacaCarro, regexpPlacaMoto } from "../JavaScript/constantes";
import { verificarEspaciosVacios } from "../JavaScript/utilidades";
import Vehiculo from "../models/vehiculoModelo";

// Controller
class ControladorVehiculo {
    constructor () {
      this.vehiculos = [];
    }

    validarPlaca(placa, tipoDeVehiculo) {
      let esPlacaValida = true;

      if (tipoDeVehiculo === "carro"){
        esPlacaValida = regexpPlacaCarro.test(placa);
      } else if (tipoDeVehiculo === "moto"){
        esPlacaValida = regexpPlacaMoto.test(placa) || regexpPlacaCarro.test(placa);
      }

      // Nos saca de la función por si la persona no pone algo y asi no se siga ejecutando todo el código
      return esPlacaValida;
    }

    agregarVehiculo({ placa, tipoDeVehiculo, color, marca, modelo, servicio }) {
      // Se esta creando la instancia de vehiculo para luego agregarlo al array
      const vehiculo = new Vehiculo(placa, tipoDeVehiculo, color, marca, modelo, servicio);

      this.vehiculos.push(vehiculo);

      return vehiculo;
    }
}

export default ControladorVehiculo;