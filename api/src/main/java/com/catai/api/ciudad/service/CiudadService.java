package com.catai.api.ciudad.service;

import com.catai.api.ciudad.model.Ciudad;

/**
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */

public interface CiudadService {

    /**
     * Devuelve un objeto {@link Ciudad} a partir de su nombre.
     *
     * @param nombreCiudad El nombre de la ciudad que se desea buscar.
     * @return Un objeto {@link  Ciudad} con el nombre especificado.
     */
    public Ciudad getCiudad(String nombreCiudad);
}
