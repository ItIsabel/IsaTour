package com.catai.api.cases.tourMonth.model;

import com.catai.api.cases.tour.model.Tour;
import jakarta.persistence.*;

/**
 * Entidad que representa la relación entre un circuito turístico y los meses de operación.
 * Esta clase implementa la tabla de unión "circuito_mes" que permite establecer una relación
 * entre circuitos y meses de operación.
 *
 * @author Isabel Alvarez
 * @version 1.2.0
 * @since 1.2.0
 */
@Entity
@Table(name = "circuito_mes")
public class TourMonth {

    /**
     * Identificador único de la relación circuito-mes.
     * Se genera automáticamente utilizando la estrategia de identidad.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Referencia al circuito turístico.
     * Se carga de forma perezosa (LAZY) para optimizar el rendimiento.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "circuito_id")
    private Tour tour;

    /**
     * Mes de operación (1-12).
     */
    @Column(name = "mes")
    private int mes;

    // GETTERS & SETTERS

    /**
     * Obtiene el identificador único de la relación circuito-mes.
     *
     * @return el ID de la relación
     */
    public Long getId() {
        return id;
    }

    /**
     * Establece el identificador único de la relación circuito-mes.
     *
     * @param id el ID a asignar
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Obtiene el circuito turístico asociado.
     *
     * @return el circuito turístico
     */
    public Tour getTour() {
        return tour;
    }

    /**
     * Establece el circuito turístico para esta relación.
     *
     * @param tour el circuito turístico a asociar
     */
    public void setTour(Tour tour) {
        this.tour = tour;
    }

    /**
     * Obtiene el mes de operación.
     *
     * @return el mes (1-12)
     */
    public int getMes() {
        return mes;
    }

    /**
     * Establece el mes de operación.
     *
     * @param mes el mes a asignar (1-12)
     */
    public void setMes(int mes) {
        this.mes = mes;
    }
}
