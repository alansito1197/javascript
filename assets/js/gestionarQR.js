document.addEventListener("DOMContentLoaded", function() {
  // Llamar a la función para generar el código QR con la información del pedido
  obtenerDatosPedido();
});

// Crearemos una función que obtenga los datos del último pedido realizado:
function obtenerDatosPedido() {

  // Hacemos una solicitud fetch para obtener los datos de este último pedido:
  fetch(`http://localhost/trabajo/index.php?controller=api&action=obtenerPedido`)
      
    // Convertimos el resultado en formato JSON:
    .then(response => response.json())
    
    .then(datosPedido => {

      // Llamaremos a la función para generar el código QR con los datos del pedido:
      generarQR(datosPedido);
    })
  }

// Crearemos una función para generar un código QR:
function generarQR(datosPedido) {

  // Utilizaremos una variable para crear el contenido que tendrá nuestro QR:
  let datosPedidoQR = `ID Pedido: ${datosPedido.id_pedido}\nID Cliente: ${datosPedido.id_cliente}\nTipo Usuario: ${datosPedido.tipo_usuario}\nPrecio Total: ${datosPedido.precio_total}\nFecha: ${datosPedido.fecha}\nEstado: ${datosPedido.estado}`;

  // Seleccionaremos el elemento HTML donde se mostrará el código QR guardándolo en una variable:
  let contenedorQR = document.getElementById('contenedorQR');

  // Crearemos un nuevo objeto QR con el tamaó de este y el contenido que tendrá dentro de si mismo:
  let nuevoQR = new QRCode(contenedorQR, {
      text: datosPedidoQR,
      width: 150,
      height: 150
  });
}
