// Model

import Usuario from "./usuarioModelo";

// Es una representación de los datos guardados
class Vehiculo {
    // Model
    constructor(placa, tipoDeVehiculo, colorId, marcaId, modelo, servicio, usuarioId){
        this.placa = placa;
        this.tipoDeVehiculo = tipoDeVehiculo;
        this.colorId = colorId;
        this.marcaId = marcaId;
        this.modelo = modelo;
        this.servicio = servicio;
        this.usuarioId = usuarioId;
    }
}

export default Vehiculo;