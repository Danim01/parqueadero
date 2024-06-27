// Model

import Usuario from "./usuarioModelo";

// Es una representación de los datos guardados
class Vehiculo {
    // Model
    constructor(placa, tipoDeVehiculo, color, marca, modelo, servicio){
        this.id = crypto.randomUUID();
        this.placa = placa;
        this.tipoDeVehiculo = tipoDeVehiculo;
        this.color = color;
        this.marca = marca;
        this.modelo = modelo;
        this.servicio = servicio;
    }
}

export default Vehiculo;