<!DOCTYPE html>
<html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="keywords" content="MediaMarkt, restaurante, comida, kebab, bocadillo, complementos, bebidas, pizzas, ofertas">
      <meta name="author" content="Alan Díaz">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="description" content="Restaurante de MediaMarkt">
      <title>Restaurante MediaMarkt</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notie/dist/notie.min.css">
      <script src="https://cdn.jsdelivr.net/npm/notie/dist/notie.min.js"></script>
      <link href="assets/css/style_css.css" rel="stylesheet">
  </head>
  <body>
  <main>
      <section class="container mt-4">
          <div class="container col-12 col-sm-4">
              <div class="row d-flex justify-content-center align-items-center">
                  <h3 class="pregunta_login">¡Nuevo comentario!</h3>
                  <p class="beneficios_login mt-3">Siéntete libre de agregar un comentario a tu gusto.</p>
                  <a class="enlace_registro pb-3" href="<?= url.'?controller=api&action=mostrarComentarios' ?>">Volver al panel de comentarios</a>
                  <div class="row">
                      <div class="col-md-6 text-center">
                          <form id="resenaForm">
                              <input type="text" class="contenedor_informacion_login" name="nombreUsuario" id="nombreUsuario" readonly>
                              <textarea cols="35" rows="4" style="resize: none;" class="contenedor_informacion_personal" required name="opinionComentario" id="opinionComentario" placeholder="Tu opinión"></textarea>
                              <p class="valoracion_texto">¿Cómo nos valoras?</p>
                              <div class="valoracion d-flex flex-row-reverse justify-content-end">
                                  <input type="radio" id="estrella5" name="puntuacion" value="5">
                                  <label for="estrella5"></label>
                                  <input type="radio" id="estrella4" name="puntuacion" value="4">
                                  <label for="estrella4"></label>
                                  <input type="radio" id="estrella3" name="puntuacion" value="3">
                                  <label for="estrella3"></label>
                                  <input type="radio" id="estrella2" name="puntuacion" value="2">
                                  <label for="estrella2"></label>
                                  <input type="radio" id="estrella1" name="puntuacion" value="1" checked>
                                  <label for="estrella1"></label>
                              </div>
                              <button type="button" class="boton_comentario" onclick="agregarComentario()">¡Agrega tu comentario!</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  </main>
  <script src="assets/js/gestionarComentario.js"></script>
  </body>
</html>