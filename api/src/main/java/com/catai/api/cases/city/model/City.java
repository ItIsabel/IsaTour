package com.catai.api.cases.city.model;

import jakarta.persistence.*;

/**
 * Entidad que representa una ciudad por la que pasan circuitos
 * Esta clase mapea a la tabla "ciudad" en la base de datos y contiene
 * información sobre su nombre.
 *
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name= "ciudad")
public class City {

    /**
     * Identificador único de la ciudad.
     * Se genera automáticamente utilizando la estrategia IDENTITY.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nombre de la ciudad.
     */
    @Column (name="nombre")
    private String nombre;

    /**
     * Nombre del pais asociado a la ciudad.
     */
    @Column (name="pais")
    private String pais;


    //GETTERS & SETTERS


    /**
     * Obtiene el identificador único de la ciudad.
     *
     * @return el identificador unico de la ciudad
     */
    public Long getId() {
        return id;
    }


    /**
     * Establece el identificador único de la ciudad.
     *
     * @param id el ID a asignar a la ciudad
     */
    public void setId(Long id) {
        this.id = id;
    }


    /**
     * Obtiene el nombre de la ciudad.
     *
     * @return el nombre de la ciudad
     */
    public String getNombre() {
        return nombre;
    }


    /**
     * Establece el nombre de la ciudad
     *
     * @param nombre el nombre a asignar a la ciudad.
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    /**
     * Obtiene el país asociado a la ciudad.
     *
     * @return el país.
     */
    public String getPais() {
        return pais;
    }


    /**
     * Establece el país asociado a la ciudad.
     *
     * @param pais el país.
     */
    public void setPais(String pais) {
        this.pais = pais;
    }
}

