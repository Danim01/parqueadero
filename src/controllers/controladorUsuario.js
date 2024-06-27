import { regexEmail } from '../JavaScript/constantes';
import Usuario from '../models/usuarioModelo';

// Controller
class ControladorUsuario {
  constructor () {
    this.usuarios = [];
  }

  validarEmail(email) {
    const isValid = regexEmail.test(email);

    if (!isValid) {
      alert("Email inválido: ", email);
    }

    return isValid;
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

  agregarUsuario({ nombre, identificacion, celular, email, vehiculoId }) {
    // Se esta creando la instancia de vehiculo para luego agregarlo al array
    const usuario = new Usuario(nombre, identificacion, celular, email, vehiculoId);

    this.usuarios.push(usuario);

    return usuario;
  }

}

export default ControladorUsuario;