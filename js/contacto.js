//Se actualiza el contador del carrito
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

document.addEventListener("DOMContentLoaded",() => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito); 
});