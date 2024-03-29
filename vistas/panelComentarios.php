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
    <link href="assets/css/style_css.css" rel="stylesheet">
  </head>
  <body>
    <main>
      <section class="container mt-4">
        <section>
          <h1 class="mt-4 titulo_principal_pagina pb-4">Nuestros comentarios</h1>
        </section>
        <section class="row">
          <section class="col-12 col-sm-3">
            <hr class="my-2 col-12 col-sm-9">
            <div class="mt-2 mb-4">
              <form id="filtroPuntuacionForm">
                <label class="titulo_filtro mb-3 mt-3" for="sabor">Filtrar por puntuación</label>
                <div class="filtro mb-2">
                  <input class="checkbox" type="checkbox" id="cinco_estrellas" value="5">
                  <label for ="cinco_estrellas"><img src="assets/imagenes/iconos/valoraciones/cinco_estrellas.svg" class="mb-3" alt="Cinco estrellas"></label>
                </div>
                <div class="filtro mb-2">
                  <input class="checkbox" type="checkbox" id="cuatro_estrellas" value="4">
                  <label for="cuatro_estrellas"><img src="assets/imagenes/iconos/valoraciones/cuatro_estrellas.svg" class="mb-3" alt="Cuatro estrellas"></label>
                </div>
                <div class="filtro mb-2">
                  <input class="checkbox" type="checkbox" id="tres_estrellas" value="3">
                  <label for="tres_estrellas"><img src="assets/imagenes/iconos/valoraciones/tres_estrellas.svg" class="mb-3" alt="Tres estrellas"></label>
                </div>
                <div class="filtro mb-2">
                  <input class="checkbox" type="checkbox" id="dos_estrellas" value="2">
                  <label for="dos_estrellas"><img src="assets/imagenes/iconos/valoraciones/dos_estrellas.svg" class="mb-3" alt="Dos estrellas"></label>
                </div>
                <div class="filtro mb-2">
                  <input class="checkbox" type="checkbox" id="una_estrella" value="1">
                  <label for="una_estrella"><img src="assets/imagenes/iconos/valoraciones/una_estrella.svg" class="mb-3" alt="Una estrella"></label>
                </div>
              </form>
            </div>
            <hr class="mt-4 my-2 col-12 col-sm-9">
            <div class="mt-1 mb-4">
              <form id="filtroValoracionForm">
                <label class="titulo_filtro mb-3 mt-2" for="valoracion">Filtrar por valoración</label>
                <div class="filtro mb-2">
                  <input class="checkbox float-start me-2" type="checkbox" id="ascendente" value="ascendente">
                  <label class="opcion_filtro mb-3" for="ascendente">Ascendente</label>
                </div>
                <div class="filtro mb-2">
                  <input class="checkbox float-start me-2" type="checkbox" id="descendente" value="descendente">
                  <label class="opcion_filtro mb-3" for="descendente">Descendente</label>
                </div>
              </form>
            </div>
            <hr class="mt-4 my-2 col-12 col-sm-9">
          </section>
          <section class="col-12 col-sm-9">
            <a class="enlace_registro pb-3 mb-3" href="<?=url.'?controller=api&action=solicitudCrearComentario'?>"> Crear un nuevo comentario</a>
              <div class="p-2 mt-4">
                <div class="card-body">
                  <div id="contenedorComentarios"></div>
                </div>
              </div>
          </section>
        </section>
      </section>
    </main>
    <script src="assets/js/gestionarComentario.js"></script>
  </body>
</html>