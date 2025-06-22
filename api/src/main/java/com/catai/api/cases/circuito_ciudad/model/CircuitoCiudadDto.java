package com.catai.api.cases.circuito_ciudad.model;

import com.catai.api.cases.circuito.model.CircuitoDto;
import com.catai.api.cases.ciudad.model.CiudadDto;

/**
 * DTO  que representa la relación entre un circuito turístico y las ciudades
 * por las que pasa. Esta clase se utiliza para transferir datos de la relación
 * Many2Many "circuito_ciudad", incluyendo el orden de visita de cada ciudad
 * dentro del circuito, sin exponer la entidad completa.
 *
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */
public class CircuitoCiudadDto {
    private Long id;
    private CircuitoDto circuito;
    private CiudadDto ciudad;


}
