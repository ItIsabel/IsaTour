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

    /**
     * Busca y recupera circuitos de un tour operador específico.
     *
     * @param touroperador nombre del tour operador
     * @return {@code List<Tour>} Lista de circuitos del tour operador.
     */
    public List<Tour> findToursByTourOperador(String touroperador);

    /**
     * Elimina un circuito de un tour operador específico.
     *
     * @param touroperador nombre del tour operador
     * @param tourId id del circuito
     */
    public void deleteCircuito(String touroperador, Long tourId);

    /**
     * Crea un nuevo circuito para un tour operador.
     *
     * @param touroperador nombre del tour operador
     * @param tour el circuito a crear
     * @param ciudades lista de IDs de ciudades
     * @param meses lista de meses de operación
     * @return el circuito creado
     */
    public Tour createCircuito(String touroperador, Tour tour, List<Long> ciudades, List<Integer> meses);

    /**
     * Actualiza un circuito existente.
     *
     * @param touroperador nombre del tour operador
     * @param tourId id del circuito
     * @param tour datos actualizados del circuito
     * @param ciudades lista de IDs de ciudades
     * @param meses lista de meses de operación
     * @return el circuito actualizado
     */
    public Tour updateCircuito(String touroperador, Long tourId, Tour tour, List<Long> ciudades, List<Integer> meses);

    public Tour findById(Long tourId);
}

