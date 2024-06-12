import { Vehiculo, Usuario } from "../models/modelo";
// Esta va a ser la clase principal que me ayuda 
// a ejecutar todo el codigo
class Main{
    constructor() {
        this.mensaje = "hola mundo";
    }

    imprimir (){
        console.log(this.mensaje);
    }

}

const main = new Main();

main.imprimir();

