import { validarPlaca, verificarEspaciosVacios } from "./utilidades.js";
import { marcasCarros, marcasMotos } from "./constantes.js";

// Esto es un evento que me sirve para detectar cuando el html carga
// completamente y ejecuta la funcion asociada al eventListener
document.addEventListener('DOMContentLoaded', () => {
  // Model
  // Es una representación de los datos guardados
  class Vehiculo{
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

  // View
  class VistaVehiculo{
    constructor() {
      this.formulario = document.getElementById("form");
      this.tbody = document.getElementById("tbody");
      this.botonesServicios = this.formulario.querySelectorAll('label.servicio input');
      this.selectTipoVehiculo = this.formulario.querySelector('#TipoDeVehiculo');
      this.select = document.getElementById("MarcaCarro");

    }

    mostrarMarcas(marcas){
      // Esto sirve para mantener la opción de seleccione marca y no se reinicie
      this.select.innerHTML = '<option value="" selected>Seleccione marca</option>';

      // Marcas Carros
      marcas.forEach(marca => {
        const option = document.createElement("option");
        // Se le esta diciendo al option que va a tener un atributo de tipo value
        option.setAttribute("value", marca);
        option.textContent = marca;
        this.select.appendChild(option);
      })
    }

    mostrarInformacionTabla(vehiculos) {
      this.tbody.innerHTML = "";
      vehiculos.forEach(vehiculo => {
        const tr = document.createElement("tr");

        // <td>${vehiculo?.usuario.nombre || ""}</td>, El signo de pregunta despues del array sirve para que el programa no se me dañe
        // si en el array no hay un usuario y el || "" sirve para que si no existe el usuario me ponga ese espacio vació
        tr.innerHTML = `
          <td>${vehiculo.placa}</td>
          <td>${vehiculo.tipoDeVehiculo}</td>
          <td>${vehiculo.color}</td>
          <td>${vehiculo.marca}</td>
          <td>${vehiculo.modelo}</td>
          <td>${vehiculo?.usuario?.nombre || "---"}</td>
          <td>${vehiculo?.usuario?.identificacion || "---"}</td>
          <td>${vehiculo?.usuario?.celular || "---"}</td>
          <td class="tabla_email">${vehiculo?.usuario?.email || "--- "}</td>
        `
        this.tbody.appendChild(tr);
      })
    }

    // Esta función sirve para eliminar el fieldset de usuario
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
      const segundoHijo = this.formulario.children[1];

      // Aquí le estamos diciendo con el insertBefore
      // que queremos insertar algo antes de lo que yo
      //le especifique entre paréntesis,
      // con el primer parámetro le decimos que es lo que
      // queremos agregar y con el segundo parámetro le
      // decimos antes de que queremos agregar nuestro elemento.
      this.formulario.insertBefore(fieldset, segundoHijo);
    }
  }

  // Controller
  class ControladorVehiculo {
    constructor() {
      this.vehiculos = [];
      this.vistaVehiculo = new VistaVehiculo();
      this.vistaVehiculo.formulario.addEventListener('submit', this.agregarVehiculo.bind(this));
      this.vistaVehiculo.botonesServicios.forEach(boton => {
        boton.addEventListener('change', this.determinarSiUsuario.bind(this))
      })
      this.vistaVehiculo.selectTipoVehiculo.addEventListener('change', this.ponerMarcas.bind(this));
    }

    determinarSiUsuario(evento){
      const valorInput = evento.target.value;
      // Esta condicional sirve para decir que si
      // el valor del input existe y es diferente de hora
      // muestre el formulario
      if (valorInput && valorInput !== 'hora') {
        this.vistaVehiculo.mostrarUsuario()
      }

      if (valorInput === 'hora'){
        this.vistaVehiculo.eliminarFieldsetUsuario();
      }
    }

    ponerMarcas(evento){
      const valorSelect = evento.target.value;
      if (valorSelect === "carro"){
        this.vistaVehiculo.mostrarMarcas(marcasCarros);
      } else if (valorSelect === "moto"){
        this.vistaVehiculo.mostrarMarcas(marcasMotos);
      }
    }

    agregarVehiculo(evento) {
      evento.preventDefault();
      // El evento.target hace referencia al elemento html que se le asocio
      // al evento, en este caso cuando la persona le da en ingresar
      // se le asocia todo el formulario
      const formulario = evento.target;

      // El formData nos sirve para traer el valor de los input
      // de un formulario usando su name como llave
      const formdata = new FormData(formulario);

      // el metodo estatico fromEntries nos ayuda para recorrer todos
      // los inputs que se extrayeron del formulario para almacenarlos en un objeto
      const datos = Object.fromEntries(formdata);

      // Destructurando, esto nos permite desempacar las propiedades de un
      // objeto en distintas variables con el mismo nombre las llaves del objeto
      const {
        placa,
        tipoDeVehiculo,
        color,
        marca,
        modelo,
        servicio,
        id,
        nombre, 
        identificacion,
        celular,
        email
      } = datos;

      // Nos saca de la función por si la persona no pone algo y asi no se siga ejecutando todo el código
      if (verificarEspaciosVacios(datos)) return

      // Aquí lo que se hace es guardar la fecha actual con el objeto date
      // con su metodo now que me entrega la fecha en milisegundos
      const horaIngreso = Date.now();

      // Aquí estamos agregando una nueva key al objeto, ingresando el
      // nombre de la nueva key y pasandole el valor de esa key
      datos.horaIngreso = horaIngreso;

      if (!validarPlaca(placa, tipoDeVehiculo)){
        alert("Placa incorrecta, por favor ingresela de nuevo");
        return
      }

      // Se esta creando la instancia de vehiculo para luego agregarlo al array
      const vehiculo = new Vehiculo(placa, tipoDeVehiculo, color, marca, modelo, servicio);

      // Esta condición crea una instancia del usuario en cada vehiculo
      if (servicio !== "hora"){
        // Aquí se crea la instancia del usuario
        const usuario = new Usuario(id, nombre, identificacion, celular, email);
        vehiculo.agregarUsuario(usuario);
      }

      this.vehiculos.push(vehiculo);
      console.log(vehiculo);
      // Aquí se llama a la función que esta en la vista
      // para que muestre la información en una tabla
      this.vistaVehiculo.mostrarInformacionTabla(this.vehiculos);
      formulario.reset();
    }
  }

  new ControladorVehiculo();
})