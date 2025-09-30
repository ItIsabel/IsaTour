package com.catai.api.cases.tourCity.service;

import com.catai.api.cases.tour.model.Tour;
import com.catai.api.cases.tourCity.model.TourCity;

import java.util.List;

public interface TourCityService {


    /**
     * Busca y recupera circuitos aplicando filtro de idCiudad.
     *
     * @param idCiudad el nombre de la ciudad donde se quieren encontrar circuitos.
     * @return {@code List<CircuitoCiudad>} Lista de circuitos filtrados.
     */

    public List<TourCity> filterToursByCity(Long idCiudad);
    public List<TourCity> filterToursByCountry(String nombreCiudad);
    public List<TourCity> findCitiesByTours (List<Tour> tours);
}
