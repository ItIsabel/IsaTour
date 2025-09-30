package com.catai.api.cases.tour.service;

import com.catai.api.cases.tour.model.Tour;
import com.catai.api.cases.tour.model.TourFilterDto;

import java.util.List;

/**
 * @author Isabel Alvarez
 * @version 1.0.1
 * @since 1.0
 */
public interface TourService {

    /**
     * Busca y recupera circuitos aplicando filtros de ciudad, país, días y touroperador.
     *
     * @param filtro Objeto {@link TourFilterDto} con los filtros a aplicar.
     * @return {@code List<CircuitoCiudad>} Lista de circuitos filtrados.
     */
    public List<Tour> findToursWithFilters(TourFilterDto filtro);

}

