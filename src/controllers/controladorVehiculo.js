import axios from "axios";
import { regexpPlacaCarro, regexpPlacaMoto } from "../JavaScript/constantes";
import { dateTimeForMysql } from "../JavaScript/utilidades";
import Vehiculo from "../models/vehiculoModelo";

// Controller
class ControladorVehiculo {
    constructor () {
      this.vehiculos = [];
    }

    async obtenerTodosVehiculos(){
      try {
        const res = await axios.get("http://localhost:3000/api/vehicles")
        this.vehiculos = [...this.vehiculos, ...res.data.vehiculos]
      } catch (error) {
        console.error("Hubo un error obteniendo los usuarios", error)
      }
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

    async agregarVehiculo({ placa, tipoDeVehiculo, color, marca, modelo, servicio, usuarioId, horaIngreso }) {
      // Se esta creando la instancia de vehiculo para luego agregarlo al array
      const vehiculo = new Vehiculo(placa, tipoDeVehiculo, color, marca, modelo, servicio, usuarioId);
      try {
        const resVehiculo = await axios.post("http://localhost:3000/api/vehicles", {
          placa: vehiculo.placa,
          tipoVehiculo: vehiculo.tipoDeVehiculo,
          marcaId: vehiculo.marcaId,
          colorId: vehiculo.colorId,
          modelo: vehiculo.modelo,
          tipoServicio: vehiculo.servicio,
          usuarioId: vehiculo.usuarioId,
          // Esta es una función que convierte la fecha como la entrega javaScript a mysql
          // para poder que mysql nos permita almacenar el dato
          horaEntrada: dateTimeForMysql(horaIngreso),
        })

        const nuevoVehiculo = await axios.get(`http://localhost:3000/api/vehicles/${resVehiculo.data.id}`)

        this.vehiculos.push(nuevoVehiculo.data.vehiculo);

        return nuevoVehiculo;
      } catch (error) {
        console.error("Hubo un error al crear el vehículo", error)
      }
    }
}

export default ControladorVehiculo;