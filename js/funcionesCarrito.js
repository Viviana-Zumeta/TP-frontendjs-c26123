import {
  guardarCarrito,
  obtenerCarrito,
  vaciarCarritoStorage,
} from "./storage.js";

import { actualizarContador, mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {
   
    const carrito = obtenerCarrito();
    carrito.push(producto);

    guardarCarrito(carrito);

    actualizarContador(carrito);
    mostrarMensaje("agregado");
};
export const eliminarProducto = (indice) => {
  const carrito = obtenerCarrito();
  
  carrito.splice(indice, 1);
  
  guardarCarrito(carrito);

  actualizarContador(carrito);
  mostrarMensaje("eliminado");
};

export const vaciarCarrito = () => {
    vaciarCarritoStorage();
    actualizarContador([]);
    mostrarMensaje("vaciado");
};
//Para obtener el total a pagar usando .reduce
export const actualizarTotalCarrito = () => {
  const resumenCarrito = document.getElementById("resumen-carrito");
  
  // Si el elemento no existe en el HTML,se evita errores
  if (!resumenCarrito) return; 

  // El estado actual del carrito desde el storage
  const carrito = obtenerCarrito();

  //.reduce: acumulador empieza en 0 y suma (precio * cantidad) de cada producto
  const total = carrito.reduce((acumulador, producto) => {
    // "cantidad" no existe todavía, por defecto se usa 1
    const cantidad = producto.cantidad || 1; 
    return acumulador + (producto.precio * cantidad);
  }, 0);

  // <section id="resumen-carrito"> muestra el resultado en carrito.html 
  resumenCarrito.innerHTML = `
    <h2>Resumen del Pedido</h2>
    <p>Total a pagar: <strong>$${total.toFixed(2)}</strong></p>
  `;
};
const carritoActualizado = obtenerCarrito();
          actualizarContador(carritoActualizado);
          actualizarTotalCarrito(); 
        
actualizarTotalCarrito();