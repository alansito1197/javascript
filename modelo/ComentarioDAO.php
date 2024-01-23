<?php

include_once 'config/dataBase.php';
include_once 'modelo/Comentario.php';

class ComentarioDAO {

    // Crearemos una función para obtener todos los comentarios de la base de datos:
    public static function getAllComentarios(){

        // Nos conectamos a la base de datos:
        $conexion = DataBase::connect();
    
        // Crearemos una consulta para obtener toda la información de cada comentario:
        $obtenerComentarios = $conexion->query("SELECT * FROM COMENTARIO");
    
        // Crearemos una variable como array para guardar en ella todos los comentarios:
        $comentarios = [];
    
        // Utilizaremos un bucle para crear un objeto Comentario y la agregaremos a la variable array:
        while ($row = $obtenerComentarios->fetch_assoc()) {
            $comentario = [
                'id_comentario' => $row['id_comentario'],
                'nombre' => $row['nombre'],
                'opinion' => $row['opinion'],
                'puntuacion' => $row['puntuacion']
            ];
    
            $comentarios[] = $comentario;
        }
    
        // Cerramos la conexión a la base de datos
        $conexion->close();
    
        // Devolveremos la variable como array con los comentarios dentro de él:
        return $comentarios;  
    }
    
    // Crearemos una función para agregar el comentario a la base de datos:
    public static function agregarComentario($comentario) {

        // Nos conectamos a la base de datos:
        $conexion = DataBase::connect();

        // Crearemos una consulta para agregar el comentario en la base de datos:
        $agregarComentario = $conexion->prepare("INSERT INTO COMENTARIO (nombre, opinion, puntuacion) VALUES (?, ?, ?)");
        
        // Obtenemos los valores del objeto:
        $nombre = $comentario->getNombre();
        $opinion = $comentario->getOpinion();
        $puntuacion = $comentario->getPuntuacion();
        
        // Vinculamos los parámetros:
        $agregarComentario->bind_param("ssi",$nombre, $opinion, $puntuacion);

        // Ejecutamos la consulta:
        $resultado = $agregarComentario->execute();
        
        // Cerraremos las consultas:
        $agregarComentario->close();
        $conexion->close();

        // Devolveremos si hemos podido agregar el comentario a la base de datos o no, devolverá 1 (Si) o 2 (No)
        return $resultado;
    }
}