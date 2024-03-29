<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="keywords" content="MediaMarkt, restaurante, comida, kebab, bocadillo, complementos, bebidas, pizzas, ofertas">
    <meta name="author" content="Alan Diaz">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="description" content="Restaurante de MediaMarkt">
    <title>MediaMarkt Restaurante</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css">
    <script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>
    <link href="assets/css/style_css.css" rel="stylesheet">
  </head>
  <body>
    <main>
      <section class="container mt-4">
        <div class="container col-12 col-sm-12">
          <div class="row d-flex justify-content-center align-items-center">
            <h3 class="pregunta_login">¡Tu pedido se ha tramitado con éxito!</h3>
            <h2>¡Este es el codigo QR con la información del pedido!</h2>
            <div class="row d-flex justify-content-center align-items-center">
              <div class="col-sm-6 mb-2 d-flex justify-content-center align-items-center">
                <div id="contenedorQR" class="QR"></div>
              </div>
            </div>
            <h2>¿Qué quieres hacer?</h2>
            <div class="row d-flex justify-content-center">
              <div class="col-sm-6 mb-2">
                <form action="<?=url.'?controller=producto&action=index'?>" method="POST">
                  <button class="boton_negro">Ir a la página principal</button>
                </form>
              </div>
              <div class="col-sm-6 mb-2">
                <form action="<?=url.'?controller=producto&action=productos'?>" method="POST">
                  <button class="boton_negro">Empezar otra compra</button>
                </form>
              </div>
              <div class="col-sm-6 mb-2">
                <form action="<?=url.'?controller=pedido&action=mostrarPedidosUsuario'?>" method="POST">
                  <button class="boton_rojo">Ver mis pedidos</button>
                </form>
              </div>
              <div class="col-sm-6 mb-2">
                <form action="<?=url.'?controller=user&action=comprobarUsuario'?>" method="POST">
                  <button class="boton_rojo">Volver a mi panel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <script src="assets/js/gestionarQR.js"></script>
  </body>
</html>