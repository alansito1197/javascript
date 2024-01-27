document.addEventListener('DOMContentLoaded', function () {
    obtenerComentarios();
    obtenerDatosUsuario();
    const nombreUsuarioInput = document.getElementById('nombreUsuario');
    const nombreUsuario = localStorage.getItem('nombre') || '';
    nombreUsuarioInput.value = nombreUsuario;
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

    // Con los comentarios obtenidos, hacemos lo siguiente:
    .then(comentarios => {

        // Llamamos a la función que devuelve cada comentario en la vista:
        imprimirComentariosEnVista(comentarios);
    })
}

// Crearemos una función para recuperar todos los datos del usuario que ha iniciado sesión:
function obtenerDatosUsuario() {

    // Enviamos una solicitud al controlador para obtener los datos del usuario que ha iniciado sesión:
    fetch('http://localhost/trabajo/index.php?controller=api&action=obtenerDatosUsuario', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })

    // Con el resultado hacemos lo siguiente:
    .then(response => {

        // Convertimos la respuesta en formato JSON
        return response.json();
    })

    // Con los datos obtenidos, hacemos lo siguiente:
    .then(data => {
        
        // Almacenaremos todos los datos del usuario en localStorage:
        localStorage.setItem('usuario_id', data.usuario_id);
        localStorage.setItem('nombre', data.nombre);
        localStorage.setItem('usuario_nombre', data.usuario_nombre);
        localStorage.setItem('tipo_usuario', data.tipo_usuario);
        localStorage.setItem('password', data.password);
        
    })

    .catch(error => console.log('Error al obtener los datos del usuario:', error));
}

// Crearemos una función para imprimir comentarios en la vista:
function imprimirComentariosEnVista(comentarios) {
    // Crearemos una variable que se asigne al id del contenedor donde imprimiremos la info de cada comentario:
    let contenedorComentarios = document.getElementById('contenedorComentarios');

    // Limpiaremos el contenido anterior para que no se nos junte con cada comentario:
    contenedorComentarios.innerHTML = '';

    // Utilizaremos un bucle para cada comentario:
    comentarios.forEach(comentario => {
        // Crearemos una variable para cada atributo del comentario:
        let nombre = comentario["nombre"];
        let opinion = comentario["opinion"];
        let puntuacion = comentario["puntuacion"];

        // Crearemos un nuevo contenedor para cada comentario:
        let contenedorComentario = document.createElement('div');
        contenedorComentario.classList.add('card', 'border', 'border-2', 'p-2', 'mb-3');

        // Crearemos un contenedor para la puntuación:
        let contenedorPuntuacion = document.createElement('p');
        contenedorPuntuacion.classList.add('card-text', 'info_apartado_producto');
        contenedorPuntuacion.innerHTML = `<strong>${nombre}</strong>`;

        // Crearemos un contenedor para las estrellas:
        let contenedorEstrellas = document.createElement('div');
        contenedorEstrellas.classList.add('estrellas-container');

        // Agregaremos las estrellas pintadas:
        for (let i = 0; i < puntuacion; i++) {
            let estrellaElemento = document.createElement('img');
            estrellaElemento.src = "assets/imagenes/iconos/valoraciones/estrella_marcada.svg";
            estrellaElemento.className = "estrella_valoracion";
            contenedorEstrellas.appendChild(estrellaElemento);
        }

        // Agregaremos las estrellas sin pintar:
        for (let i = 0; i < 5 - puntuacion; i++) {
            let estrellaElemento = document.createElement('img');
            estrellaElemento.src = "assets/imagenes/iconos/valoraciones/estrella_no_marcada.svg";
            estrellaElemento.className = "estrella_valoracion";
            contenedorEstrellas.appendChild(estrellaElemento);
        }

        // Agregaremos el contenido del comentario al nuevo contenedor:
        contenedorComentario.innerHTML = `
            <div class="card-body">
                ${contenedorPuntuacion.outerHTML}
                <p class="card-text info_apartado_producto" id="opinionComentario">${opinion}</p>
            </div>
        `;

        // Agregamos el contenedor de estrellas al contenido del comentario:
        contenedorComentario.querySelector('.card-body').appendChild(contenedorEstrellas);

        // Agregamos el nuevo contenedor al contenedor principal
        contenedorComentarios.appendChild(contenedorComentario);
    });
}

async function filtrarComentarios() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const puntuacionesSeleccionadas = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => parseInt(checkbox.value));

    console.log("Puntuaciones seleccionadas:", puntuacionesSeleccionadas);

    try {
        // Obtener todos los comentarios
        const comentarios = await obtenerComentarios();
        console.log("Todos los comentarios:", comentarios);

        // Filtrar comentarios según las puntuaciones seleccionadas
        const comentariosFiltrados = comentarios.filter(comentario =>
            puntuacionesSeleccionadas.includes(comentario.puntuacion)
        );

        console.log("Comentarios filtrados:", comentariosFiltrados);

        // Mostrar solo los comentarios filtrados
        imprimirComentariosEnVista(comentariosFiltrados);
    } catch (error) {
        console.error("Error al obtener comentarios:", error);
    }
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