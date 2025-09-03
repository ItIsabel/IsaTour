package com.catai.api.cases.ciudad.service;

import com.catai.api.cases.ciudad.model.Ciudad;

import java.util.List;

/**
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */

public interface CiudadService {

    /**
     * Devuelve todas las {@link Ciudad} de los itinerarios.
     *
     * @return Un List de {@link  Ciudad} .
     */
    public List<Ciudad> getTodasCiudades();

    /**
     * Devuelve todos los paises en los que hay ciudades con itinerarios.
     *
     * @return Un List de Paises.
     */
    public List <String> getTodosPaises();


    /**
     * Devuelve un objeto {@link Ciudad} a partir de su nombre.
     *
     * @param nombreCiudad El nombre de la ciudad que se desea buscar.
     * @return Un objeto {@link  Ciudad} con el nombre especificado.
     */
    public Ciudad getCiudadporNombre(String nombreCiudad);

    /**
     * Devuelve todas las {@link Ciudad} de un país en las que hay un circuito disponible.
     *
     * @return Un List de {@link  Ciudad} .
     */
    public List <Ciudad> getCiudadesPorPais (String nombrePais);



}
