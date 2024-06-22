class VistaVehiculo {
    constructor () {
        this.formulario = document.getElementById("form");
        this.tbody = document.getElementById("tbody");
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
}

export default VistaVehiculo;