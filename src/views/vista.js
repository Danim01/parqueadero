import { marcasCarros, marcasMotos } from "../JavaScript/constantes";

// View
class Vista{
    constructor() {
        this.formulario = document.getElementById("form");
        this.tbody = document.getElementById("tbody");
        this.botonesServicios = this.formulario.querySelectorAll('label.servicio input');
        this.selectTipoVehiculo = this.formulario.querySelector('#TipoDeVehiculo');
        this.select = document.getElementById("MarcaCarro");

        this.selectTipoVehiculo.addEventListener('change', this.ponerMarcas.bind(this));
        this.botonesServicios.forEach(boton => {
            boton.addEventListener('change', this.manejarServicios.bind(this));
        })
    }

    // Mostrar marcas
    ponerMarcas(evento){
        const valorSelect = evento.target.value;
        if (valorSelect === "carro"){
            this.mostrarMarcas(marcasCarros);
        } else if (valorSelect === "moto"){
            this.mostrarMarcas(marcasMotos);
        }
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

    // Vincular submit con clase main
    inicializarEventoSubmit(funcion) {
        this.formulario.addEventListener('submit', funcion);
    }

    // Mostrar campos de usuario según el servicio que se elija
    manejarServicios(evento) {
        const servicio = evento.target.value;

        if (servicio !== 'hora') {
            this.mostrarUsuario();
        } else {
            this.eliminarFieldsetUsuario();
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
            <input type="text" name="email" id="email" no-validate/>
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

    // Esta función sirve para eliminar el fieldset de usuario
    eliminarFieldsetUsuario(){
        const fieldsetExistente = document.getElementById("fieldsetUsuario");

        if (fieldsetExistente){
        fieldsetExistente.remove();
        }
    }

    // Llenar tabla
    mostrarInformacionTabla(vehiculos, usuarios) {
        this.tbody.innerHTML = "";
        vehiculos.forEach(vehiculo => {
            const usuario = usuarios.find((usuario) => usuario.vehiculoId === vehiculo.id);

            const tr = document.createElement("tr");

            // <td>${vehiculo?.usuario.nombre || ""}</td>, El signo de pregunta despues del array sirve para que el programa no se me dañe
            // si en el array no hay un usuario y el || "" sirve para que si no existe el usuario me ponga ese espacio vació
            tr.innerHTML = `
                <td>${vehiculo.placa}</td>
                <td>${vehiculo.tipoDeVehiculo}</td>
                <td>${vehiculo.color}</td>
                <td>${vehiculo.marca}</td>
                <td>${vehiculo.modelo}</td>
                <td>${usuario?.nombre || "---"}</td>
                <td>${usuario?.identificacion || "---"}</td>
                <td>${usuario?.celular || "---"}</td>
                <td class="tabla_email">${usuario?.email || "--- "}</td>
            `
            this.tbody.appendChild(tr);
        })
    }
}

export default Vista;