import axios from 'axios';

// Controller
class ControladorConstantes {
  constructor () {
  }

  async obtenerMarcas (type) {
    const res = await axios.get("http://localhost:3000/api/brands")

    const marcasArreglo = res.data.marcas;

    return marcasArreglo.filter(marca => marca.tipo_vehiculo === type)
  }

  async obtenerColores () {
    const res = await axios.get("http://localhost:3000/api/colors")

    return res.data.colores;
  }
}

export default ControladorConstantes;