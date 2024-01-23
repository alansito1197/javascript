<?php
    class Comentario {
        
                protected $id_comentario;
                protected $nombre;
                protected $opinion;
                protected $puntuacion;

                public function __construct($id_comentario, $nombre, $opinion, $puntuacion) {
                        $this->id_comentario = $id_comentario;
                        $this->nombre = $nombre;
                        $this->opinion = $opinion;
                        $this->puntuacion = $puntuacion;
                }

                public function getIdComentario(){
                        return $this->id_comentario;
                }

                public function setIdComentario($id_comentario){
                        $this->id_comentario = $id_comentario;
                        return $this;
                }

                public function getNombre(){
                        return $this->nombre;
                }

                public function setNombre($nombre){
                        $this->nombre = $nombre;
                        return $this;
                }

                public function getOpinion(){
                        return $this->opinion;
                }

                public function setOpinion($opinion){
                        $this->opinion = $opinion;
                        return $this;
                }

                public function getPuntuacion(){
                        return $this->puntuacion;
                }

                public function setPuntuacion($puntuacion){
                        $this->puntuacion = $puntuacion;
                        return $this;
                }
        }