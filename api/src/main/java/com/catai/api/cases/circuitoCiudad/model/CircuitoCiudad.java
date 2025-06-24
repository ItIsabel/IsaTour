package com.catai.api.cases.circuitoCiudad.model;

import com.catai.api.cases.circuito.model.Circuito;
import com.catai.api.cases.ciudad.model.Ciudad;
import jakarta.persistence.*;

/**
 * Entidad que representa la relación entre un circuito turístico y las ciudades por las que pasa.
 * Esta clase implementa la tabla de unión "circuito_ciudad" que permite establecer una relación
 * Many2Many entre circuitos y ciudades, incluyendo el orden de visita de cada ciudad
 * dentro del circuito.
 *
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "circuito_ciudad")
public class CircuitoCiudad {

    /**
     * Identificador único de la relación circuito-ciudad.
     * Se genera automáticamente utilizando la estrategia de identidad.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Referencia al circuito turístico al que pertenece esta relación.
     * Se carga de forma perezosa (LAZY) para optimizar el rendimiento.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "circuito_id")
    private Circuito circuito;

    /**
     * Referencia a la ciudad que forma parte del circuito.
     * Se carga de forma perezosa (LAZY) para optimizar el rendimiento.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ciudad_id")
    private Ciudad ciudad;

    /**
     * Orden de visita de la ciudad dentro del circuito turístico.
     * Permite establecer la secuencia en la que se deben visitar las ciudades.
     */
    @Column(name = "orden_ciudad")
    private Integer ordenCiudad;



    //GETTERS & SETTERS


    /**
     * Obtiene el identificador único de la relación circuito-ciudad.
     *
     * @return el ID de la relación
     */
    public Long getId() {
        return id;
    }


    /**
     * Establece el identificador único de la relación circuito-ciudad.
     *
     * @param id el ID a asignar
     */
    public void setId(Long id) {
        this.id = id;
    }


    /**
     * Obtiene el circuito turístico asociado a esta relación.
     *
     * @return el circuito turístico
     */
    public Circuito getCircuito() {
        return circuito;
    }


    /**
     * Establece el circuito turístico para esta relación.
     *
     * @param circuito el circuito turístico a asociar
     */
    public void setCircuito(Circuito circuito) {
        this.circuito = circuito;
    }


    /**
     * Obtiene la ciudad asociada a esta relación.
     *
     * @return la ciudad del circuito
     */
    public Ciudad getCiudad() {
        return ciudad;
    }


    /**
     * Establece la ciudad para esta relación.
     *
     * @param ciudad la ciudad a asociar al circuito
     */
    public void setCiudad(Ciudad ciudad) {
        this.ciudad = ciudad;
    }


    /**
     * Obtiene el orden de visita de la ciudad dentro del circuito.
     *
     * @return el orden numérico de la ciudad en el circuito
     */
    public Integer getOrdenCiudad() {
        return ordenCiudad;
    }


    /**
     * Establece el orden de visita de la ciudad dentro del circuito.
     *
     * @param ordenCiudad el orden numérico a asignar (ej: 1 para primera ciudad)
     */
    public void setOrdenCiudad(Integer ordenCiudad) {
        this.ordenCiudad = ordenCiudad;
    }
}