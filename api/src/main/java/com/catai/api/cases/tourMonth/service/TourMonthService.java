package com.catai.api.cases.tourMonth.service;

import com.catai.api.cases.tour.model.Tour;

import java.util.List;

/**
 * Servicio para la gestión de meses de operación de circuitos.
 *
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */
public interface TourMonthService {

    /**
     * Obtiene los meses de operación de un circuito específico.
     *
     * @param tourId el ID del circuito
     * @return lista de números de mes (1-12)
     */
    List<Integer> getMesesByTourId(Long tourId);

    /**
     * Actualiza los meses de operación de un circuito.
     *
     * @param tour el circuito
     * @param meses lista de números de mes (1-12)
     */
    void updateMesesForCircuito(Tour tour, List<Integer> meses);
}
