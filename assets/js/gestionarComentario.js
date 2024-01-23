document.addEventListener('DOMContentLoaded', function () {
    obtenerComentarios();
});

// Crearemos una función para mostrar todos los comentarios de la página web:
function obtenerComentarios() {

    // Enviamos una solicitud al controlador para obtener los comentarios::
    fetch('http://localhost/trabajo/index.php?controller=api&action=obtenerComentariosEnJson', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })

    // Con el resultado hacemos lo siguiente:
    .then(response => {

        // Convertimos la respuesta en formato json:
        return response.json();
    })

    .then(comentarios => {

        // Llamamos a la función que devuelve cada comentario en la vista:
        imprimirComentariosEnVista(comentarios);
    })
}

// Crearemos una función para imprimir comentarios en la vista:
function imprimirComentariosEnVista(comentarios) {

    // Crearemos una variable que se asigne al id del contenedor donde imprimiremos la info de cada comentario:
    let contenedorComentarios = document.getElementById('contenedorComentarios');

    // Limpiaremos el contenido anterior para que no se nos junte con cada comentario:
    contenedorComentarios.innerHTML = ''; 

    // Utilizaremos un bucle para cada comentario:
    comentarios.forEach(comentario => {

        // Craremos una variable para cada atributo del comentario:
        let nombre = comentario["nombre"];
        let opinion = comentario["opinion"];
        let puntuacion = comentario["puntuacion"];

        // Crearemos un nuevo contenedor para cada comentario
        let contenedorComentario = document.createElement('div');
        contenedorComentario.classList.add('card', 'border', 'border-2', 'p-2', 'mb-3');

        // Agregaremos el contenido del comentario al nuevo contenedor:
        contenedorComentario.innerHTML = `
            <div class="card-body">
                <p class="card-text info_apartado_producto" id="nombreUsuario"><strong>${nombre}</strong></p>
                <p class="card-text info_apartado_producto" id="opinionComentario">${opinion}</p>
                <p class="card-text info_apartado_producto" id="puntuacionComentario">Puntuación: ${puntuacion}</p>
            </div>
        `;

        // Agregaremos el nuevo contenedor al contenedor principal
        contenedorComentarios.appendChild(contenedorComentario);
    });
}

// Crearemos una función para agregar un comentario en la base de datos:
function agregarComentario() {

    // Guardaremos en una variable cada campo recogido del formulario:
    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const opinionComentario = document.getElementById('opinionComentario').value;
    const puntuacion = document.querySelector('input[name="puntuacion"]:checked').value;

    // Validaremos que todos los campos estén completos antes de procesar el comentario:
    if (!nombreUsuario || !opinionComentario || !puntuacion) {

        // Mostraremos un mensaje de error en el caso de que no complete todos los campos del formulario:
        notie.alert({
            type: 'error',
            text: 'Completa todos los campos antes de agregar el comentario',
            time: 3
        });

        return;
    }

    // Crearemos un objeto que agrupa toda la información del nuevo comentario recopilado del formulario:
    const nuevoComentario = {
        nombre: nombreUsuario,
        opinion: opinionComentario,
        puntuacion: puntuacion,
    };

    // Realizaremos una solicitud para agregar el comentario a la base de datos:
    fetch('http://localhost/trabajo/index.php?controller=api&action=agregarComentario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },

        // Cogeremos el objeto nuevoComentario y lo convertiremos en una cadena JSON:
        body: JSON.stringify(nuevoComentario),
    })

    .then(response => response.text())

    .then(resultado => {

        // Analizamos el JSON y mostraremos un mensaje por consola y otro al usuario con el resultado de la gestión:
        try {

            const respuestaJSON = JSON.parse(resultado);

            // Mostraremos un mensaje de éxito si conseguimos agregar el comentario en la base de datos:
            notie.alert({
                type: 'success',
                text: 'Comentario agregado exitosamente',
                time: 3
            });

        } catch (error) {

            // Mostraremos un mensaje de error si falla el agregar el comentario en la base de datos:
            notie.alert({
                type: 'error',
                text: 'Error al agregar el comentario',
                time: 3
            });
        }
    })
}