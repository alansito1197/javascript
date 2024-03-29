<?php

    include_once 'config/dataBase.php';

    class UsuarioDAO {

        public function getBuscarUsuario($email) {

            // Nos conectamos a la base de datos:
            $conexion = DataBase::connect();
        
            // Crearemos una variable para comprobar si el email introducido por el usuario es un cliente:
            $busquedaCredencialCliente = "SELECT cliente.id_cliente AS ID, cliente.email, credencial.tipo_usuario, credencial.password, cliente.nombre
                                          FROM CLIENTE cliente
                                          JOIN CREDENCIAL credencial ON cliente.id_cliente = credencial.id_cliente
                                          WHERE credencial.tipo_usuario = 'cliente' AND cliente.email = ?";

            // Crearemos una variable para comprobar si el email introducido por el usuario es un empleado:
            $busquedaCredencialAdministrador = "SELECT administrador.id_administrador AS ID, administrador.email, credencial.tipo_usuario, credencial.password, administrador.nombre
                                                FROM ADMINISTRADOR ADMINISTRADOR
                                                JOIN CREDENCIAL credencial ON administrador.id_administrador = credencial.id_administrador
                                                WHERE credencial.tipo_usuario = 'administrador' AND administrador.email = ?";
        
            // Preparar y ejecutar consulta para cliente
            $stmtCliente = $conexion->prepare($busquedaCredencialCliente);

            // Vincularemos los parámetros:
            $stmtCliente->bind_param("s", $email);

            // Ejecutaremos la consulta:
            $stmtCliente->execute();
        
            /* Inicializamos la variable que devolveremos más adelante para que si no encuentra usuarios en la base de datos relacionados con el correo introducido
            por el usuario no aparezca un error por pantalla */
            $usuario = null;

             // Obtener resultados para cliente
        $resultadoCliente = $stmtCliente->get_result();
    
        if ($resultadoCliente->num_rows > 0) {
            // Si encontramos algún registro que coincida con el cliente, guardamos dicho objeto en una variable:
            require_once 'modelo/Cliente.php';  // Asegúrate de proporcionar la ruta correcta
            $usuario = $resultadoCliente->fetch_object('Cliente');

            // Cerraremos la consulta del cliente:
            $stmtCliente->close();
        
        } else {
    
            // Preparararemos y ejecutaremos la consulta para el administrador:
            $stmtAdministrador = $conexion->prepare($busquedaCredencialAdministrador);

            // Vincularemos los parámetros:
            $stmtAdministrador->bind_param("s", $email);

            // Ejecutaremos la consulta:
            $stmtAdministrador->execute();
    
            // Guardaremos los resultados obtenidos para el administrador:
            $resultadoAdministrador = $stmtAdministrador->get_result();
    
            if ($resultadoAdministrador->num_rows > 0) {
                // Si encontramos algún registro que coincida con el administrador, guardamos dicho objeto en una variable:
                require_once 'modelo/Administrador.php';  // Asegúrate de proporcionar la ruta correcta
                $usuario = $resultadoAdministrador->fetch_object('Administrador');
            }
    
            // Cerraremos la consulta del administrador:
            $stmtAdministrador->close();
        }
    
        return $usuario;
    }
}
?>