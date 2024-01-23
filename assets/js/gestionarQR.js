document.addEventListener("DOMContentLoaded", function() {
  // Llamar a la función para generar el código QR con la información del pedido
  obtenerDatosPedido();
});

function obtenerDatosPedido() {

  // Hacer una solicitud fetch para obtener los datos del pedido
  fetch(`http://localhost/trabajo/index.php?controller=api&action=obtenerPedido`)
      .then(response => response.json())
      .then(datosPedido => {
        console.log('Datos del pedido:', datosPedido); // Agrega este log
          // Llamar a la función para generar el código QR con los datos del pedido
          generarQR(datosPedido);
      })
      .catch(error => console.error('Error al obtener los datos del pedido:', error));
}

function generarQR(datosPedido) {
  // Construir la cadena de datos del pedido
  let datosPedidoQR = `ID Pedido: ${datosPedido.id_pedido}\nID Cliente: ${datosPedido.id_cliente}\nTipo Usuario: ${datosPedido.tipo_usuario}\nPrecio Total: ${datosPedido.precio_total}\nFecha: ${datosPedido.fecha}\nEstado: ${datosPedido.estado}`;

  // Seleccionar el elemento HTML donde se mostrará el código QR
  let contenedorQR = document.getElementById('contenedorQR');

  // Crear una instancia del objeto QRCode
  let qrcode = new QRCode(contenedorQR, {
      text: datosPedidoQR,
      width: 150,
      height: 150
  });

  // Puedes personalizar el estilo del código QR según tus necesidades
  contenedorQR.style.border = "2px solid #000";
}
