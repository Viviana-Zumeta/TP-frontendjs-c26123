import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

//Funcion que renderiza las tarjetas de productos
const renderizarProductos = () => {
  //Agarramos el div para meter las tarjetas
  const contenedor = document.getElementById("contenedor-tarjetas");

  fetch("./data/productos.json")
    .then((response) => response.json())
    .then((data) =>
      data.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card", "text-dark");

        const img = document.createElement("img");
        img.src = `./${producto.img}`;
        img.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;
        
        const descripcion = document.createElement("p");
        descripcion.textContent = producto.descripcion;

        const precio = document.createElement("p");
        precio.textContent = `$${producto.precio}`;

        const boton = document.createElement("button");
        boton.classList.add("btn", "bg-secondary", "text-dark");
        boton.textContent = "Agregar al pedido";

        boton.addEventListener("click", () => {
          agregarAlCarrito(producto);
        });

        //Sigo adentro del ciclo

        // Armar la estructura de la tarjeta
        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(descripcion);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(boton);

        //Agrego la tarjeta al DOM
        contenedor.appendChild(tarjeta);
      }),
    )
    .catch((error) => console.log(error));

  //Sigo adentro de la funcion renderizarProductos
};

document.addEventListener("DOMContentLoaded", () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);
  renderizarProductos();
});
