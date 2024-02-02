document.addEventListener('DOMContentLoaded', function () {
    // Función para calcular el precio total con la propina seleccionada
    function calcularPrecioTotal() {
        // Obtener el precio total del pedido
        var precioTotal = parseFloat(document.querySelector('.precio_total').textContent);

        // Obtener el valor del radio button seleccionado
        var opcionPropinaSeleccionada = document.querySelector('input[name="opcionComer"]:checked').value;

        // Convertir el valor del radio button a porcentaje
        var porcentajePropina = parseFloat(opcionPropinaSeleccionada);

        // Calcular el monto de la propina
        var propina = precioTotal * porcentajePropina;

        // Mostrar el monto de la propina en el DOM
        document.querySelector('.precio_opcion.mb-0').textContent = porcentajePropina * 100 + "%"; // Actualizar el porcentaje mostrado
        document.querySelector('.precio_opcion.mb-0').nextElementSibling.textContent = propina.toFixed(2) + "€"; // Mostrar el monto de la propina
    }

    // Agregar un listener de cambio a todos los radio buttons de opciones de propina
    var opcionesPropina = document.querySelectorAll('input[name="opcionComer"]');
    opcionesPropina.forEach(function (opcion) {
        opcion.addEventListener('change', function () {
            calcularPrecioTotal(); // Calcular el precio total cuando cambia la opción de propina
        });
    });

    // Calcular el precio total inicial
    calcularPrecioTotal();
});
