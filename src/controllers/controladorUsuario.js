import axios from 'axios';
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

  async obtenerTodosUsuarios(){
    try {
      const res = await axios.get("http://localhost:3000/api/users")
      this.usuarios = [...this.usuarios, ...res.data.usuarios]
    } catch (error) {
      console.error("Hubo un error obteniendo los usuarios", error)
    }
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

  async agregarUsuario({ nombre, identificacion, celular, email, vehiculoId }) {
    // Se esta creando la instancia de vehiculo para luego agregarlo al array
    const usuario = new Usuario(nombre, identificacion, celular, email, vehiculoId);
    console.log("creando usuario")
    try {
      const resUsuario = await axios.post("http://localhost:3000/api/users", {
        nombre: usuario.nombre,
        identificacion: usuario.identificacion,
        celular: usuario.celular,
        email: usuario.email
      })
      console.log(resUsuario)
      const nuevoUsuarioRes = await axios.get(`http://localhost:3000/api/users/${resUsuario.data.id}`)
      const nuevoUsuario = nuevoUsuarioRes.data.usuario;
      this.usuarios.push(nuevoUsuario);
      
      return nuevoUsuario;
      
    } catch (error) {
      console.error("Error creando un nuevo usuario", error)
    }
  }

}

export default ControladorUsuario;