import VistaVehiculo from "../views/viewVehiculo";
import VistaUsuario from "../views/viewsUsuario";

class ControladorUsuario {
  constructor () {
    this.usuario = [];
    this.vistaVehiculo = new VistaVehiculo();
    this.vistaUsuario = new VistaUsuario();
    this.vistaUsuario.botonesServicios.forEach(boton => {
        boton.addEventListener('change', this.determinarSiUsuario.bind(this))
    })
  }

  determinarSiUsuario(evento){
    const valorInput = evento.target.value;
    // Esta condicional sirve para decir que si
    // el valor del input existe y es diferente de hora
    // muestre el formulario
    if (valorInput && valorInput !== 'hora') {
      this.vistaUsuario.mostrarUsuario()
    }

    if (valorInput === 'hora'){
      this.vistaUsuario.eliminarFieldsetUsuario();
    }
  }

}

export default ControladorUsuario;