// Expresión regular
const regexpPlacaCarro = /^[A-Z]{3}\d{3}$/;
const regexpPlacaMoto = /^[A-Z]{3}\d{2}[A-Z]$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const marcasCarros = [
  "Renault",
  "Toyota",
  "Chevrolet",
  "Mazda",
  "Kia",
  "Suzuki",
  "Nissan",
  "Volkswagen",
  "Ford",
  "Hyundai",
  "Otra"
];

const marcasMotos = [
  "Bajaj",
  "Yamaha",
  "AKT",
  "Victory",
  "Honda",
  "Suzuki",
  "TVS",
  "Hero",
  "Kymco",
  "Benelli",
  "Otra"
];

/* El export sirve para exportar la información que yo quiera utilizar en otros archivos
    si son varias variables las que quiero exportar las guardo en un objeto, pero si solo 
    es una se exporta así: export default y el nombre de la variable */
export {
  regexEmail,
  regexpPlacaCarro,
  regexpPlacaMoto,
  marcasCarros,
  marcasMotos
}