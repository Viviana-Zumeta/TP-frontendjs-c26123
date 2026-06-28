
import { obtenerCarrito } from "./storage.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

//Para obtener el total a pagar usando .reduce
const actualizarTotalCarrito = (carrito) => {
  const resumenCarrito = document.getElementById("resumen-carrito");
  
  // Si el elemento no existe en el HTML,se evita errores
  if (!resumenCarrito) return;

  // .reduce: acumulador empieza en 0 y suma (precio * cantidad) de cada producto
  const total = carrito.reduce((acumulador, producto) => {
    const cantidad = producto.cantidad || 1; 
    return acumulador + (producto.precio * cantidad);
  }, 0);

  //<section id="resumen-carrito"> muestra el resultado en carrito.html
  resumenCarrito.innerHTML = `
    <h3>Resumen del Pedido</h3>
    <p1>Total a pagar: <strong>$${total.toFixed(2)}</strong></p1>
  `;
};

const renderizarCarrito = () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);
actualizarTotalCarrito(carrito);
  const contenedor = document.getElementById("contenedor-carrito");
  const divAcciones = document.getElementById("acciones-carrito");
//Para resetear el carrito cada vez que se borra un producto
  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";

  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-carrito-vacio");
    mensaje.textContent = "Todavía no elegiste tu pizza 😕";

    contenedor.appendChild(mensaje);
    return;
  }
//Todo esto es cuando hay productos
  carrito.forEach((producto, index) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("card");

    const img = document.createElement("img");
    img.src = `../${producto.img}`;
    img.alt = producto.nombre;

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;
    
    const descripcion = document.createElement("p");
    descripcion.textContent = producto.descripcion;

    const precio = document.createElement("p");
    precio.textContent = `$${producto.precio}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn");
    btnEliminar.classList.add("btn-eliminar-carrito");
    btnEliminar.textContent = "Eliminar pedido";

    btnEliminar.addEventListener("click", () => {
      eliminarProducto(index);
      //Una vez que se elimina un producto hay que volver
      // a reconstruir el DOM con la info actual del localStorage
      renderizarCarrito();
    });

    tarjeta.appendChild(img);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(descripcion);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(btnEliminar);

    contenedor.appendChild(tarjeta);
  });

  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn");
  btnVaciar.classList.add("btn-vaciar-carrito");
  btnVaciar.textContent = "Vaciar pedido";

  btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
    
  });

  divAcciones.appendChild(btnVaciar);
 
};

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
});
