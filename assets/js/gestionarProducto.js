document.addEventListener('DOMContentLoaded', function () {
    
    // Creremos una variable para obtener todos los checkboxes dentro del formulario:
    const checkboxes = document.querySelectorAll('#filtroCategoriaProducto input[type="checkbox"]');

    // Crearemos un objeto para almacenar las categorias seleccionadas:
    let filtros = {

        // Definiremos una variable como un array para ir guardando en su interior las categorias seleccionadas por el usuario:
        categoriasSeleccionadas: []
    };

    // Por cada checkbox marcado, verificaremos si está marcado y actualizaremos el estado del filtro
    checkboxes.forEach(checkbox => {

        // Agregaremos un evento "change" a cada checkbox seleccionado:
        checkbox.addEventListener('change', function () {

            // Definiremos una variable para cada categoria: 
            const categoriaSeleccionada = checkbox.value;

            // Actualizaremos el estado del filtro según si el checkbox está marcado o desmarcado:
            if (checkbox.checked) {

                // Si está marcado, agregamos la categoría seleccionada al array de categorías seleccionadas:
                filtros.categoriasSeleccionadas.push(categoriaSeleccionada);
            } else {

                // Si está desmarcado, filtramos el array de categorías seleccionadas para eliminar la categoría deseleccionada:
                filtros.categoriasSeleccionadas = filtros.categoriasSeleccionadas.filter(categoria => categoria !== categoriaSeleccionada);
            }

             // Llamaremos a la función que se encarga de actualizar la vista:
             actualizarVistaConFiltro(filtros);
         });
    });

    // Crearemos una función para actualizar la vista según el o los filtros seleccionados:
    function actualizarVistaConFiltro(filtros) {

        // Crearemos una variable que recoja todos los productos que tenemos en la vista:
        const productos = document.querySelectorAll('.contenedor_productos');
        
        // Por cada iteración, actualizamos el estilo de visualización del producto según el filtro
        productos.forEach(elemento => {

            // Mostraremos el producto si no hay categorías seleccionadas o si alguna categoría coincide:
            if (filtros.categoriasSeleccionadas.length === 0 || filtros.categoriasSeleccionadas.some(categoria => elemento.classList.contains(categoria))) {
                
                elemento.style.display = ''; 
            
            } else {

                // Ocultaremos el producto si ninguna categoría coincide:
                elemento.style.display = 'none'; 
            }
        });

        // Si tenemos una categoria seleccionada, haremos lo siguiente:
        if (filtros.categoriasSeleccionadas.length > 0) {

            // Llamaremos a la función que se encarga de mostrar el enlace para deshacer los filtros:
            mostrarDeshacerFiltros();
        
        } else {
            // Si no, llamaremos a la función que se encarga de ocultar el enlace para deshacer los filtros:
            evitarDuplicadoDeshacerFiltros();
        }
    }

    // Crearemos una función para mostrar el botón que deshace los filtros:
    function mostrarDeshacerFiltros() {

        // Definimos una variable para agregar el botón de deshacer los filtros:
        let contenedorEnlace = document.getElementById('enlaceDeshacerFiltros');

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
        
        // En nuestro objeto "filtros", haremos lo siguiente:
        filtros = {

            // Vaciaremos la array para que muestre todos los productos de la web:
            categoriasSeleccionadas: [],
        };

        // Por cada checkbox marcado, lo desmarcaremos:
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        // Llamaremos a la función que se encarga de ocultar el enlace para deshacer los filtros:
        evitarDuplicadoDeshacerFiltros();
        
        // Llamaremos a la función que se encarga de actualizar la vista:
        actualizarVistaConFiltro(filtros);
    }

    // Crearemos una función para evitar que haya más de un enlace para borrar los filtros:
    function evitarDuplicadoDeshacerFiltros() {

        // Definimos una variable para el contenedor del enlace que destruye los filtros:
        const contenedorEnlace = document.getElementById('enlaceDeshacerFiltros');

        // Si esta variable existe, hacemos lo siguiente:
        if (contenedorEnlace) {

            // Ocultamos el enlace:
            contenedorEnlace.style.display = 'none';
        }
    }
});