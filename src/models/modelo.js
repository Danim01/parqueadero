// Model
// Es una representación de los datos guardados
class Vehiculo {
    constructor(placa, tipoDeVehiculo, color, marca, modelo, servicio){
        this.placa = placa;
        this.tipoDeVehiculo = tipoDeVehiculo;
        this.color = color;
        this.marca = marca;
        this.modelo = modelo;
        this.servicio = servicio;
    }

    // Esto me vincula un usuario con un vehiculo
    agregarUsuario(usuario){
        // Con el this lo que hago es decir que voy a crear una instancia 
        // del usuario en el vehiculo 
        this.usuario = usuario;
    }
}

class Usuario {
    constructor(nombre, identificacion, celular, email){
        this.nombre = nombre;
        this.identificacion = identificacion;
        this.celular = celular;
        this.email = email;
    }
}

export {
    Vehiculo,
    Usuario
}