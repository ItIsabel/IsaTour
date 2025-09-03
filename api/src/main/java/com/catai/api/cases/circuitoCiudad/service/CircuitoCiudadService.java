package com.catai.api.cases.circuitoCiudad.service;

import com.catai.api.cases.circuito.model.Circuito;
import com.catai.api.cases.circuitoCiudad.model.CircuitoCiudad;
import com.catai.api.cases.circuitoCiudad.model.FiltroDto;

import java.util.List;

public interface CircuitoCiudadService {
    /**
     * Busca y recupera todos los circuitos disponibles en una ciudad específica.
     *
     * Este método valida el nombre de la ciudad en el {@code FiltroDto}, busca la ciudad
     * y luego recupera todos los circuitos asociados a ella. Registra información de logging
     * en cada etapa del proceso.
     *
     * @param dto Objeto {@link FiltroDto} con el nombre de la ciudad (campo {@code nombreCiudad} obligatorio).
     * @return {@code List<CircuitoCiudad>} Lista de circuitos encontrados; vacía si no hay circuitos
     * o la ciudad no existe. Nunca {@code null}.
     * @throws IllegalArgumentException si {@code dto} es {@code null} o {@code nombreCiudad} está vacío.
     * @throws RuntimeException si ocurre un error interno durante la búsqueda de la ciudad o circuitos.
     */
    public List<CircuitoCiudad> encuentraCircuitosenCiudad(FiltroDto dto) throws Exception;
    
    /**
     * Busca y recupera todos los circuitos disponibles en un país específico.
     *
     * Este método busca todas las ciudades asociadas al país especificado y luego
     * recupera todos los circuitos asociados a esas ciudades.
     *
     * @param country Nombre del país para buscar los circuitos.
     * @return {@code List<Circuito>} Lista de circuitos encontrados; vacía si no hay circuitos
     * o el país no existe. Nunca {@code null}.
     */
    public List<Circuito> findCircuitosByCountry(String country);
}
