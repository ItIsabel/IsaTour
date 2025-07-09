package com.catai.api.cases.extension.model;

import com.catai.api.cases.circuito.model.Circuito;
import com.catai.api.cases.circuito.model.CircuitoDto;
import jakarta.persistence.*;

/**
 * Entidad que representa un una extensión de circuito.
 * Esta clase mapea a la tabla "extension" en la base de datos y contiene
 * información sobre diferentes ciudades,paises y playas con las que se
 * puede prolongar un viaje. Ver PDF EstructuraBBDD en el repositorio de github
 *
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "extension")
public class Extension {

    /**
     * Identificador único de la extension.
     * Se genera automáticamente utilizando la estrategia IDENTITY.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    /**
     * Referencia al circuito turístico que puede hacerse antes de esta extensión.
     * Se carga de forma perezosa (LAZY) para optimizar el rendimiento.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "circuito_id")
    private Circuito circuito;

    /**
     * Nombre de la extensión.
     */
    @Column(name = "nombre")
    private String nombre;



    //GETTERS & SETTERS


    /**
     * Obtiene el identificador único de la extensión.
     *
     * @return el identificador unico de la extensión
     */
    public long getId() {
        return id;
    }


    /**
     * Establece el identificador único de la extensión.
     *
     * @param id el ID a asignar a la extensión
     */
    public void setId(long id) {
        this.id = id;
    }


    /**
     * Obtiene el circuito asociado a la extensión.
     *
     * @return el circuito asociado a la extensión
     */
    public Circuito getCircuito() {
        return circuito;
    }


    /**
     * Establece el circuito asociado a la extensión.
     *
     * @param circuito el circuito asociado a la extensión
     */
    public void setCircuito(Circuito circuito) {
        this.circuito = circuito;
    }


    /**
     * Obtiene el nombre de la extensión.
     *
     * @return el nombre de la extensión
     */
    public String getNombre() {
        return nombre;
    }


    /**
     * Establece el nombre de la extensión
     *
     * @param nombre el nombre a asignar a la extensión.
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }


}
