import VistaVehiculo from "./viewVehiculo";

class VistaUsuario {
  constructor () {
      this.vistaVehiculo = new VistaVehiculo();
      this.botonesServicios = this.vistaVehiculo.formulario.querySelectorAll('label.servicio input');
  }

  eliminarFieldsetUsuario(){
    const fieldsetExistente = document.getElementById("fieldsetUsuario");

    if (fieldsetExistente){
      fieldsetExistente.remove();
    }
  }

  mostrarUsuario(){
    this.eliminarFieldsetUsuario();
    const fieldset = document.createElement("fieldset");
    fieldset.setAttribute("id", "fieldsetUsuario");
    fieldset.innerHTML = `
      <legend>Registro usuario</legend>
      <label class="label">
        <span>Nombre</span>
        <input type="text" name="nombre" id="nombre" />
      </label>
      <label class="label">
        <span>Identificación</span> 
        <input type="text" name="identificacion" id="identificacion" />
      </label>
      <label class="label">
        <span>Celular</span>
        <input type="number" name="celular" id="celular"/>
      </label>
      <label class="label">
        <span>Email</span>
        <input type="email" name="email" id="email"/>
      </label>
    `

    // Aquí lo que se hace con el children es guardar
    // todos los hijos del formulario en un array,
    // le decimos entre [] la posición del hijo que
    // queremos almacenar en la variable segundoHijo
    // que en este caso seria el botón de ingresar.
    const segundoHijo = this.vistaVehiculo.formulario.children[1];

    // Aquí le estamos diciendo con el insertBefore
    // que queremos insertar algo antes de lo que yo
    //le especifique entre paréntesis,
    // con el primer parámetro le decimos que es lo que
    // queremos agregar y con el segundo parámetro le
    // decimos antes de que queremos agregar nuestro elemento.
    this.vistaVehiculo.formulario.insertBefore(fieldset, segundoHijo);
  }
}

export default VistaUsuario;