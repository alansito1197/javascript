
let orden = {
    tipo: ''
};

// Inicializa una variable global para almacenar los comentarios
let comentariosMostrados = [];

document.addEventListener('DOMContentLoaded', function () {

    // Llamaremos a la función que nos obtiene todos los comentarios de la base de datos:
    obtenerComentarios();

    // Llamaremos a la función que nos obtiene todos los datos del usuario que ha iniciado sesión:
    obtenerDatosUsuario();

    asignarNombreUsuario();

    // Crearemos una función para asignar el nombre de usuario recuperado en el almacenamiento del navegador en la vista de agregar un comentario:
    function asignarNombreUsuario() {
        
        // Guardaremos en una variable el nombre del usuario recuperado del almacenamiento del navegador:
        const nombreUsuario = localStorage.getItem('nombre') || '';
        
        // Asignaremos el nombre de usuario al HTML:
        const nombreUsuarioInput = document.getElementById('nombreUsuario');
        if (nombreUsuarioInput) {
            nombreUsuarioInput.value = nombreUsuario;
        }
    }

    // Crearemos una variable para guardar todos los checkboxes que tengamos marcados::
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
   
    // Crearemos una variable para guardar todos los checkboxes de las valoraciones que tengamos marcados:
    let checkboxesValoracion = document.querySelectorAll("#filtroValoracionForm input");
    
    // Por cada iteracion, haremos lo siguiente:
    checkboxesValoracion.forEach(ordenacion => {

        // Haremos un evento de tipo change:
        ordenacion.addEventListener("change", ()=>{
            
            // Si el valor de la variable es ascendente, entonces:
            if(ordenacion.value === "ascendente"){

                // El valor del atributo tipo del objeto orden será el siguiente:
                orden.tipo = 'ascendente';

            // Si no lo es, entonces:
            } else {

                // El valor del atributo tipo del objeto orden será el siguiente:
                orden.tipo = 'descendente';
            }

            // Llamaremos a la función que nos devuelve los comentarios filtrados:
            obtenerComentariosFiltrados();

            // Llamaremos a la función que mostrará el enlace para deshacer los filtros una vez los hayamos seleccionado:
            mostrarDeshacerFiltros();
        });
    });   

    // Obtendremos los checkboxes de orden ascendente y descendente:
    const checkboxAscendente = document.getElementById('ascendente');
    const checkboxDescendente = document.getElementById('descendente');

    // Agregaremos un event listener al checkbox de orden ascendente:
    checkboxAscendente.addEventListener('change', function() {
        
        // Si el checkbox de orden ascendente está marcado:
        if (checkboxAscendente.checked) {

            // Desmarcaremos el otro checkbox del formulario:
            checkboxDescendente.checked = false;

            // Si hay filtros de puntuación, llamaremos a la función para obtener los comentarios ordenados según la base de datos:
            if (hayFiltrosDePuntuacion()) {

                // Llamaremos a la función que nos devuelve los comentarios ordenador y filtrados:
                obtenerComentariosFiltradosYOrdenados();
            } else {
                obtenerComentariosFiltrados();
            }
        } else {
            
            // Si el checkbox de orden ascendente se desmarca, restablecer el estado de ordenamiento al valor predeterminado de la base de datos
            orden.tipo = '';
            
            // Si no hay filtros de puntuación, haremos lo siguiente:
            if (!hayFiltrosDePuntuacion()) {

                // Llamaremos a la función que nos obtiene los comentarios de la base de datos:
                obtenerComentarios();

            } else {
                
                // Si no, llamaremos a la función que nos obtiene los comentarios filtrados:
                obtenerComentariosFiltrados();
            }
        }
    });
    
    // Agregaremos un event listener al checkbox de orden descendente:
    checkboxDescendente.addEventListener('change', function() {
        
       // Si el checkbox de orden descendente está marcado:
        if (checkboxDescendente.checked) {
            
            // Desmarcaremos el otro checkbox del formulario:
            checkboxAscendente.checked = false;
            
            // Si no hay filtros de puntuación llamaremos a la función para obtener los comentarios ordenados según la base de datos:
            if (hayFiltrosDePuntuacion()) {

                // Si no hay filtros de puntuación llamaremos a la función para obtener los comentarios ordenados y filtrados:
                obtenerComentariosFiltradosYOrdenados();

            } else {

                // Si no, llamaremos a la función que obtiene los comentarios filtrados:
                obtenerComentariosFiltrados();
            }

        // Si no, haremos lo siguiente:
        } else {
            
            // Si el checkbox de orden descendente se desmarca, restableceremos el orden de los comentarios al valor predeterminado de la base de datos
            orden.tipo = '';
            
            // Si no hay filtros de puntuación llamaremos a la función para obtener los comentarios ordenados según la base de datos:
            if (!hayFiltrosDePuntuacion()) {
                
                obtenerComentarios();
            } else {

                // Si no, llamaremos a la función que obtiene los comentarios filtrados:
                obtenerComentariosFiltrados();
            }
        }
    });

    // Por cada checkbox marcado, haremos lo siguiente:
    checkboxes.forEach(checkbox => {

        // Agregaremos un event listener a cada checkbox:
        checkbox.addEventListener('click', function () {

            // Si el checkbox desmarcado es el de ascendente o descendente, actualizaremos la vista sin filtros llamando a las funciones pertinentes:
            if (checkbox.value === "ascendente" || checkbox.value === "descendente") {
                obtenerComentarios();
                ocultarDeshacerFiltros();
                return;
            }

            // Llamaremos a la función que nos devolverá los comentarios filtrados:
            obtenerComentariosFiltrados()

            // Llamaremos a la función que nos muestra el enlace para deshacer los filtros:
            mostrarDeshacerFiltros();
        });
    });

    // Crearemos una función para obtener todos los comentarios de la base de datos:
    function obtenerComentarios() {

        // Realizaremos una solicitud a la API para obtener todos los comentarios:
        fetch('http://localhost/trabajo/index.php?controller=api&action=obtenerComentariosEnJson')
        
        // Con la respuesta del servidor haremos lo siguiente:
        .then(response => {

            // La respuesta la convertiremos a formato JSON y la devolveremos:
            return response.json();
        })

        // Con los datos convertidos a JSON haremos lo siguiente:
        .then(comentarios => {

            // Llamaremos a la función que imprime cada comentario en la vista enviándole por parámetro cada comentario:
            imprimirComentariosEnVista(comentarios);
        })
    }

    // Crearemos una función para obtener los comentarios filtrados:
    function obtenerComentariosFiltrados() {

        // Crearemos unas variables para recuperar los datos que necesitaremos:
        const puntuacionesSeleccionadas = obtenerPuntuacionesSeleccionadas();
        const tipoOrden = orden.tipo;
    
        // Realizaremos la solicitud para obtener los comentarios filtrados:
        fetch('http://localhost/trabajo/index.php?controller=api&action=obtenerComentariosFiltrados', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ 
                puntuaciones: puntuacionesSeleccionadas
            })
        })

        // Con los datos convertidos a JSON haremos lo siguiente:
        .then(response => {

            // Convertiremos a formato JSON y la devolveremos:
            return response.json();
        })

        // Con los comentarios, haremos lo siguiente:
        .then(comentariosFiltrados => {

            // Limpiaremos el contenedor de comentarios antes de agregar los nuevos comentarios filtrados:
            const contenedorComentarios = document.getElementById('contenedorComentarios');
            contenedorComentarios.innerHTML = '';
            
            // Ordenaremos y luego imprimiremos los comentarios filtrados:
            ordenarComentarios(comentariosFiltrados, tipoOrden);
            imprimirComentariosEnVista(comentariosFiltrados);
        })
        .catch(error => {
            console.error('Error al obtener comentarios filtrados:', error);
            throw error;
        });
    }
    
    // Función para obtener comentarios filtrados y ordenados:
    function obtenerComentariosFiltradosYOrdenados() {

        // Variables para almacenar los valores necesarios:
        const puntuacionesSeleccionadas = obtenerPuntuacionesSeleccionadas(); // Obtiene las puntuaciones seleccionadas
        const tipoOrden = orden.tipo; // Obtiene el tipo de orden
        const hayFiltros = hayFiltrosDePuntuacion(); // Verifica si hay filtros activos

        // Realizaremos la solicitud para obtener los comentarios filtrados:
        return fetch('http://localhost/trabajo/index.php?controller=api&action=obtenerComentariosFiltrados', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8', // Encabezado de la solicitud
            },
            body: JSON.stringify({ 
                puntuaciones: puntuacionesSeleccionadas
            })
        })
        .then(response => {

            // Convertiremos la respuesta en formato JSON:
            return response.json();
        })
        .then(comentariosFiltrados => {

            // Actualizaremos la variable global con los comentarios filtrados y ordenados
            comentariosMostrados = comentariosFiltrados;

            // Filtraremos y ordenaremos los comentarios según los filtros y el tipo de orden
            if (hayFiltros) {
                const comentariosFiltradosSeleccionados = comentariosFiltrados.filter(comentario => puntuacionesSeleccionadas.includes(comentario.puntuacion));
                ordenarComentarios(comentariosFiltradosSeleccionados, tipoOrden);
                return comentariosFiltradosSeleccionados; // Devuelve los comentarios filtrados y ordenados
            } else {
                ordenarComentarios(comentariosFiltrados, tipoOrden);
                return comentariosFiltrados; // Devuelve los comentarios filtrados y ordenados
            }
        })
        .catch(error => {
            console.error('Error al obtener comentarios filtrados y ordenados:', error);
            throw error;
        });
    }

    // Crearemos una función para ordenar los comentarios según el tipo de orden seleccionado:
    function ordenarComentarios(comentarios, tipoOrden) {
        if (tipoOrden === 'ascendente') {
            comentarios.sort((a, b) => {

                return a.puntuacion - b.puntuacion;
            });
        } else if (tipoOrden === 'descendente') {
            comentarios.sort((a, b) => {

                return b.puntuacion - a.puntuacion;
            });
        }
    }

    // Crearemos una función para mostrar el botón que deshace los filtros:
    function mostrarDeshacerFiltros() {

        // Definimos una variable para agregar el botón de deshacer los filtros:
        let contenedorEnlace = document.getElementById('enlaceDeshacerFiltros');

        // Verificaremos si hay algún checkbox marcado:
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const algunCheckboxMarcado = Array.from(checkboxes).some(checkbox => checkbox.checked);

        // Si no hay ningún checkbox marcado, no mostramos el botón de deshacer filtros:
        if (!algunCheckboxMarcado) {

            // Si el contenedor existe, lo eliminamos:
            if (contenedorEnlace) {
                contenedorEnlace.remove();
            }
            return;
        }

        // Si el contenedor no existe, es decir, no hemos filtrado todavía:
        if (!contenedorEnlace) {

            // Creamos una variable y le asignamos una a para que sea un enlace:
            contenedorEnlace = document.createElement('a');

            // Asignamos el ID al enlace que creamos en la vista:
            contenedorEnlace.id = 'enlaceDeshacerFiltros';

            // Agregamos una clase CSS al enlace:
            contenedorEnlace.classList.add('enlace_deshacer_filtros');

            // Agregaremos el texto al enlace que hemos creado:
            contenedorEnlace.textContent = 'Deshacer filtros';

            // Hacemos que el texto creado para deshacer el filtro sea un enlace:
            contenedorEnlace.href = '#';

            // Agregamos un evento click que llamará a la función que deshace los filtros:
            contenedorEnlace.addEventListener('click', deshacerFiltros);

            // Insertamos el elemento justo antes de la variable donde guardamos el enlace que borra los filtros:
            document.querySelector('.col-12.col-sm-9').insertAdjacentElement('beforebegin', contenedorEnlace);

        } else {

            // Si el contenedor ya existe, mostramos el enlace:
            contenedorEnlace.style.display = '';
        }
    }

    // Crearemos una función que deshaga los filtros que tenemos seleccionados:
    function deshacerFiltros() {

        // Crearemos una variable para coger todos los checkboxs marcados:
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');

        // Por cada checkbox marcado hacemos:
        checkboxes.forEach(checkbox => {

            // Lo desmarcamos:
            checkbox.checked = false;
        });

        // Restableceremos el estado de ordenamiento al valor predeterminado de la base de datos:
        orden.tipo = '';

        // Llamaremos a la función que nos devuelve los comentarios sin filtrar:
        obtenerComentarios();

        // Llamaremos a la función que elimina el enlace para deshacer los filtros que tenemos aplicados en la vista:
        ocultarDeshacerFiltros();
    }

    // Crearemos una función para evitar que haya más de un enlace para borrar los filtros:
    function ocultarDeshacerFiltros() {
        
        // Definimos una variable para el contenedor del enlace que destruye los filtros:
        const contenedorEnlace = document.getElementById('enlaceDeshacerFiltros');

        // Si esta variable existe, hacemos lo siguiente:
        if (contenedorEnlace) {

            // Eliminamos este contenedor para que no haya más de un enlace para deshacer los filtros:
            contenedorEnlace.remove();
        }
    }

    // Crearemos una función para obtener todas las puntuaciones que el usuario haya seleccionado:
    function obtenerPuntuacionesSeleccionadas() {
        
        // Crearemos una variable para guardar en ella todos los checkboxes que el usuario haya seleccionado:
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');

        // Filtraremos los checkboxes para obtener solo los que están marcados y tienen valores numéricos:
        const puntuacionesSeleccionadas = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked && !isNaN(parseInt(checkbox.value)))
            .map(checkbox => parseInt(checkbox.value));

        
        // if (puntuacionesSeleccionadas.length === 0) {
        //     // Si ningún checkbox está marcado o ninguno tiene un valor numérico, devolveremos todas las puntuaciones disponibles:
        //     return [1, 2, 3, 4, 5];
        // }
        
        // Devolveremos las puntuaciones seleccionadas si hay al menos una marcada y con valor numérico:
        return puntuacionesSeleccionadas;
    }

    // Crearemos una función para imprimir cada comentario en nuestra vista:
    function imprimirComentariosEnVista(comentarios) {

        // Ordenaremos los comentarios según el tipo de orden:
        if (orden.tipo === 'ascendente') {
            comentarios.sort((a, b) => a.puntuacion - b.puntuacion);
        } else if (orden.tipo === 'descendente') {
            comentarios.sort((a, b) => b.puntuacion - a.puntuacion);
        }

        // Crearemos una variable para crear cada contenedor por cada comentario que tengamos:
        let contenedorComentarios = document.getElementById('contenedorComentarios');

        // Vaciaremos el contenido del contenedor del comentario anterior:
        contenedorComentarios.innerHTML = '';

        if (comentarios.length === 0) {
            
            // Si no hay comentarios a mostrar, mostraremos un mensaje indicándolo:
            contenedorComentarios.innerHTML = '<p>No hay comentarios disponibles</p>';

        } else {

            // Por cada comentario, haremos lo siguiente:
            comentarios.forEach(comentario => {

                // Guardaremos en una variable el valor introducido por el usuario:
                let nombre = comentario["nombre"];
                let opinion = comentario["opinion"];
                let puntuacion = comentario["puntuacion"];

                // Crearemos un contenedor individual para cada comentario:
                let contenedorComentario = document.createElement('div');

                // Agregaremos un estilo a cada contenedor:
                contenedorComentario.classList.add('card', 'border', 'border-2', 'p-2', 'mb-3');

                // Crearemos una p para agregar el texto de cada comentario:
                let contenedorPuntuacion = document.createElement('p');

                // Agregaremos un estilo a cada p:
                contenedorPuntuacion.classList.add('card-text', 'info_apartado_producto');

                // Mostraremos el nombre en negrita
                contenedorPuntuacion.innerHTML = `<strong>${nombre}</strong>`;

                // Crearemos un contenedor para las valoraciones de cada comentario:
                let contenedorEstrellas = document.createElement('div');

                // Utilizaremos un for para mostrar una estrella roja mientras sea mas pequeña que la valoracion:
                for (let i = 0; i < puntuacion; i++) {
                    let estrellaElemento = document.createElement('img');
                    estrellaElemento.src = "assets/imagenes/iconos/valoraciones/estrella_marcada.svg";
                    estrellaElemento.className = "estrella_valoracion";
                    contenedorEstrellas.appendChild(estrellaElemento);
                }

                // Utilizaremos un bucle para mostrar una estrella gris mientras sea mas pequeña que 5 que es el máximo menos la puntuación dada por el usuario:
                for (let i = 0; i < 5 - puntuacion; i++) {
                    let estrellaElemento = document.createElement('img');
                    estrellaElemento.src = "assets/imagenes/iconos/valoraciones/estrella_no_marcada.svg";
                    estrellaElemento.className = "estrella_valoracion";
                    contenedorEstrellas.appendChild(estrellaElemento);
                }

                // Montaremos la estructura del contenedor:
                contenedorComentario.innerHTML = `
                    <div class="card-body">
                        ${contenedorPuntuacion.outerHTML}
                        <p class="card-text info_apartado_producto" id="opinionComentario">${opinion}</p>
                    </div>
                `;

                // Agregaremos el contenesodr de las estrellas al cuerpo del comentario:
                contenedorComentario.querySelector('.card-body').appendChild(contenedorEstrellas);

                // Agregaremos el comentario al contenedor general de los comentarios
                contenedorComentarios.appendChild(contenedorComentario);
            });
        }
    }

    // Crearemos una función para obtener todos los datos del usuario que ha iniciado sesión::
    function obtenerDatosUsuario() {

        // Realizaremos una solicitud a la API para obtener todos los datos del usuario:
        fetch('http://localhost/trabajo/index.php?controller=api&action=obtenerDatosUsuario')

        // Con la respuesta del servidor haremos lo siguiente:
        .then(response => {

            // La respuesta la convertiremos a formato JSON y la devolveremos:
            return response.json();
        })

        // Con los datos convertidos a JSON haremos lo siguiente:
        .then(data => {

            // Guardaremos los datos del usuario en el almacenamiento local del navegador:
            localStorage.setItem('usuario_id', data.usuario_id);
            localStorage.setItem('nombre', data.nombre);
            localStorage.setItem('usuario_nombre', data.usuario_nombre);
            localStorage.setItem('tipo_usuario', data.tipo_usuario);
            localStorage.setItem('password', data.password);
        })
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

        // La respuesta la convertiremos a formato texto:
        .then(response => response.text())

        // Con la respuesta del servidor haremos lo siguiente:
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

    // Crearemos una función para verificar si hay filtros de puntuación activos:
    function hayFiltrosDePuntuacion() {
        const checkboxesValoracion = document.querySelectorAll("#filtroValoracionForm input");
        const hayFiltros = Array.from(checkboxesValoracion).some(checkbox => checkbox.checked);
        console.log("¿Hay filtros de puntuación activos?", hayFiltros);
        return hayFiltros;
    }
    
});