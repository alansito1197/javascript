<?php

    include_once 'config/dataBase.php';
    include_once 'modelo/ComentarioDAO.php';
    include_once 'modelo/PedidoDAO.php';

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
                null,
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

        public function obtenerPedido() {
            // Utilizamos el método obtenerIdUltimoPedido de PedidoDAO para obtener el ID del último pedido
            $idUltimoPedido = PedidoDAO::obtenerIdUltimoPedido();
        
            if ($idUltimoPedido) {
                // Ahora que tenemos el ID del último pedido, obtenemos el pedido completo
                $pedido = PedidoDAO::getPedidoByID($idUltimoPedido);
        
                // Verificamos si se encontró el pedido
                if ($pedido) {
                    // Devolvemos todos los datos del pedido en formato JSON
                    $datosPedido = array(
                        'id_pedido' => $pedido->getIdPedido(),
                        'id_cliente' => $pedido->getIdCliente(),
                        'tipo_usuario' => $pedido->getTipoUsuario(),
                        'precio_total' => $pedido->getPrecioTotal(),
                        'fecha' => $pedido->getFecha(),
                        'estado' => $pedido->getEstado()
                    );
        
                    echo json_encode($datosPedido);
                } else {
                    // Manejo de error si no se encuentra el pedido completo
                    echo json_encode(['error' => 'Pedido no encontrado']);
                }
            } else {
                // Manejo de error si no se encuentra el ID del último pedido
                echo json_encode(['error' => 'ID del último pedido no encontrado']);
            }
        }
    }