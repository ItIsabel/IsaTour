package com.catai.api.cases.city.service.city;

import com.catai.api.cases.city.model.City;
import com.catai.api.cases.tour.model.TourFilterDto;

import java.util.List;

/**
 * @author Isabel Alvarez
 * @version 1.0.1
 * @since 1.0
 */

public interface CityService {

    /**
     * Devuelve todas las {@link City} de los itinerarios.
     *
     * @return Un List de {@link  City} .
     */
    public List<City> findCities();




    /**
     * Devuelve un objeto {@link City} a partir de su nombre.
     *
     * @param idCiudad El nombre de la ciudad que se desea buscar.
     * @return Un objeto {@link  City} con el nombre especificado.
     */
    public City getCityById(Long idCiudad);

    /**
     * Devuelve todas las {@link City} de un país en las que hay un circuito disponible.
     *
     * @return Un List de {@link  City} .
     */
    public List <City> findCitiesByCountry(String nombrePais);



}
