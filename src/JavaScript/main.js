import Vehiculo from "../models/vehiculoModelo";
import Usuario from "../models/usuarioModelo";
import VistaVehiculo from "../views/viewVehiculo";
import VistaUsuario from "../views/viewsUsuario";
import ControladorVehiculo from "../controllers/controllerVehiculo";
import ControladorUsuario from "../controllers/controllersUsuario";

// Esta va a ser la clase principal que me ayuda 
// a ejecutar todo el código
class Main{
    constructor() {
        this.vistaVehiculo = new VistaVehiculo();
        this.vistaUsuario = new VistaUsuario();
        this.controladorVehiculo = new ControladorVehiculo();
        this.controladorUsuario = new ControladorUsuario();
    }

}

new Main();


