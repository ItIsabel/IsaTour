package com.catai.api.cases.tourCity.model;

import com.catai.api.cases.tour.model.Tour;
import com.catai.api.cases.city.model.City;
import jakarta.persistence.*;

/**
 * Entidad que representa la relación entre un circuito turístico y las ciudades por las que pasa.
 * Esta clase implementa la tabla de unión "circuito_ciudad" que permite establecer una relación
 * Many2Many entre circuitos y ciudades.
 * dentro del circuito.
 *
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "circuito_ciudad")
public class TourCity {

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
    private Tour tour;

    /**
     * Referencia a la ciudad que forma parte del circuito.
     * Se carga de forma perezosa (LAZY) para optimizar el rendimiento.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ciudad_id")
    private City city;




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
    public Tour getCircuito() {
        return tour;
    }


    /**
     * Establece el circuito turístico para esta relación.
     *
     * @param tour el circuito turístico a asociar
     */
    public void setCircuito(Tour tour) {
        this.tour = tour;
    }


    /**
     * Obtiene la ciudad asociada a esta relación.
     *
     * @return la ciudad del circuito
     */
    public City getCity() {
        return city;
    }


    /**
     * Establece la ciudad para esta relación.
     *
     * @param city la ciudad a asociar al circuito
     */
    public void setCity(City city) {
        this.city = city;
    }


}