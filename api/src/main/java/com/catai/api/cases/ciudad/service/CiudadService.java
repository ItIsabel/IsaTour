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
     * Devuelve todas las {@link Ciudad} de los itinerarios de Catai.
     *
     * @return Un List de {@link  Ciudad} .
     */
    public List<Ciudad> getTodasCiudades();


    /**
     * Devuelve un objeto {@link Ciudad} a partir de su nombre.
     *
     * @param nombreCiudad El nombre de la ciudad que se desea buscar.
     * @return Un objeto {@link  Ciudad} con el nombre especificado.
     */
    public Ciudad getCiudadporNombre(String nombreCiudad);




}
