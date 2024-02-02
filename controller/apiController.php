<?php

    include_once 'config/dataBase.php';
    include_once 'modelo/ComentarioDAO.php';
    include_once 'modelo/PedidoDAO.php';
    include_once 'modelo/ProductoDAO.php';

    class apiController {

        // Crearemos una función para obtener todos los comentarios de la página web en formato json:
        public function obtenerComentariosEnJson() {

            // Llamamos al método que nos devuelve los comentarios de la base de datos:
            $comentarios = ComentarioDAO::getAllComentarios();
        
            // Convertimos el array de php de los comentarios en un json:
            echo json_encode ($comentarios, JSON_UNESCAPED_UNICODE);
        
            return;
        }

        // Crearemos una función para mostrar todos los comentarios de la página web:
        public function mostrarComentarios() {

            include 'vistas/header.php';
        
            include 'vistas/panelComentarios.php';
        
            include 'vistas/footer.php';
        }

        // Crearemos una función para mostrar la vista para agregar el comentario o no, dependiendo si ha iniciado sesión previamente:
        public function solicitudCrearComentario() {
            include 'vistas/header.php';
            if (isset($_SESSION['usuario_id']) && isset($_SESSION['usuario_nombre']) && isset($_SESSION['password']) && isset($_SESSION['tipo_usuario'])) {
                include 'vistas/panelCrearComentario.php';
            } else {
                include 'vistas/panelInicioSesionRequerido.php';
            }
            include 'vistas/footer.php';
        }

        // Crearemos una función para manejar la lógica del lado del servidor para agregar un comentario a la base de datos:
        public function agregarComentario() {

            // Decodificamos los datos JSON recibidos en la solicitud:
            $datosComentario = json_decode(file_get_contents("php://input"), true);
        
            // Crearemos un nuevo objeto Comentario con los datos que hemos recibido:
            $nuevoComentario = new Comentario(
                
                null, // Definimos como null el ID del comentario ya que en nuestra base de datos es autoincremental.
                $datosComentario['nombre'],
                $datosComentario['opinion'],
                $datosComentario['puntuacion']
            );
        
            // Llamamos a la función que agrega el comentario a la base de datos:
            if (ComentarioDAO::agregarComentario($nuevoComentario)) {

                // Si conseguimos agregar el comentario a la base de datos, mostramos un mensaje de éxito:
                echo json_encode(array('mensaje' => 'Comentario agregado exitosamente'));
            } else {

                // Si no conseguimos agregar el comentario a la base de datos, mostramos un mensaje de error:
                http_response_code(500);
                echo json_encode(array('mensaje' => 'Error al agregar el comentario'));
            }
        }

        // Crearemos una función para manejar la lógica de parte del servidor para obtener los datos del último pedido realizado:
        public function obtenerPedido() {

            // Utilizamos el método obtenerIdUltimoPedido de PedidoDAO para obtener el ID del último pedido:
            $idUltimoPedido = PedidoDAO::obtenerIdUltimoPedido();
        
            if ($idUltimoPedido) {

                // Si la variable devuelve 1, obtenemos todos los datos del pedido mediante la llamada al método encargado de ello:
                $pedido = PedidoDAO::getPedidoByID($idUltimoPedido);
        
                // Guardamos todos los datos del pedido en una variable en forma de array:
                $datosPedido = array(
                    'id_pedido' => $pedido->getIdPedido(),
                    'id_cliente' => $pedido->getIdCliente(),
                    'tipo_usuario' => $pedido->getTipoUsuario(),
                    'precio_total' => $pedido->getPrecioTotal(),
                    'fecha' => $pedido->getFecha(),
                    'estado' => $pedido->getEstado()
                );
        
                // Convertimos el array donde tenemos guardado todo el contenido del pedido en formato JSON:
                echo json_encode($datosPedido);

            } else {
                
                // Si la variable no devuelve 1, es decir, no encontramos el ID del pedido, mostraremos un mensaje de error por la consola:
                echo json_encode(['error' => 'ID del último pedido no encontrado']);
            }
        }

    // Crearemos una función para obtener comentarios filtrados por puntuación:
    public function obtenerComentariosFiltrados() {

        // Decodificamos los datos JSON recibidos en la solicitud:
        $datosFiltro = json_decode(file_get_contents("php://input"), true);
    
        // Verificamos si se proporcionaron puntuaciones para filtrar:
        if (isset($datosFiltro['puntuaciones']) && is_array($datosFiltro['puntuaciones'])) {
            // Obtener el tipo de ordenamiento (ascendente o descendente)
            $orden = isset($datosFiltro['orden']) ? $datosFiltro['orden'] : 'ascendente';
    
            // Obtener los comentarios filtrados de la base de datos, pasando el tipo de ordenamiento
            $comentariosFiltrados = ComentarioDAO::getComentariosFiltrados($datosFiltro['puntuaciones'], ['orden']);
    
            // Convertir el array de comentarios filtrados en formato JSON y enviar como respuesta
            echo json_encode($comentariosFiltrados, JSON_UNESCAPED_UNICODE);
        } else {
            // Si no se proporcionaron puntuaciones válidas, mostrar un mensaje de error:
            http_response_code(400);
            echo json_encode(array('mensaje' => 'Error en los datos de filtrado'));
        }
    }
    
    // Crearemos una función que nos recupere todos los datos del usuario que ha iniciado sesión: 
    public function obtenerDatosUsuario() {

        // Guardaremos toda esta información en una array:
        $datosUsuario = array();

        // Verificamos si el usuario ha iniciado sesión
        if(isset($_SESSION['usuario_id']) && isset($_SESSION['usuario_nombre']) && isset($_SESSION['tipo_usuario']) && isset($_SESSION['nombre']) && isset($_SESSION['password'])) {

            // Si el usuario ha iniciado sesión, configuramos la variable con los datos del usuario:
            $datosUsuario['usuario_id'] = $_SESSION['usuario_id'];
            $datosUsuario['usuario_nombre'] = $_SESSION['usuario_nombre'];
            $datosUsuario['tipo_usuario'] = $_SESSION['tipo_usuario'];
            $datosUsuario['password'] = $_SESSION['password'];
            $datosUsuario['nombre'] = $_SESSION['nombre'];

        } else {
            // Si el usuario no ha iniciado sesión, configuramos un mensaje de error en la respuesta:
            $datosUsuario['error'] = 'Usuario no autenticado';
        }

        // Convertimos los datos a JSON y los devolvemos:
        echo json_encode($datosUsuario);
    }
}