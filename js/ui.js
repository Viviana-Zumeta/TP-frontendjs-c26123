export const actualizarContador = (carrito) => {
  const contador = document.getElementById("contador-carrito");
  if (contador) {
    contador.textContent = carrito.length;
  }
};

//Agregué las alertas de SweetAlert
export const mostrarMensaje = (accion) => {
  switch(accion) {
    case "agregado":
    Swal.fire({
    title: "¡Agregado!",
    text: "El producto se sumó a tu pedido 🎉`",
    icon: "success" ,
    confirmButtonColor: "#FFB74D"
});
break;

case "eliminado":
  Swal.fire({
  title: "¡Eliminado!",
  text: "El producto fue quitado del pedido ❌ ",
  icon: "warning",
  confirmButtonColor: "#8B0000"
});
break;

case "vaciado":
  Swal.fire({
  title: "Pedido vacío",
  text: "Se eliminaron todos los productos 🗑 ",
  icon: "info",
  confirmButtonColor: "#F57C00"
});
}
}
