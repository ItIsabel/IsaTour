package com.catai.api.cases.circuito_ciudad.service;

import com.catai.api.cases.circuito_ciudad.CircuitoCiudadRepository;
import com.catai.api.cases.circuito_ciudad.model.CircuitoCiudad;
import com.catai.api.cases.circuito_ciudad.model.FiltroDto;
import com.catai.api.cases.ciudad.model.Ciudad;
import com.catai.api.cases.ciudad.service.CiudadService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */

@Service
@Slf4j
public class CircuitoCiudadServiceImpl implements CircuitoCiudadService {

    @Autowired
    CiudadService ciudadService;

    @Autowired
    CircuitoCiudadRepository circuitoCiudadRepository;

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
    @Override
    public List<CircuitoCiudad> encuentraCircuitosenCiudad(FiltroDto dto) {
        // Validación de entrada
        if (dto.getNombreCiudad() == null) {
            throw new IllegalArgumentException("El nombre de la ciudad es requerido para obtener los circuitos");
        }

        try {
            // Buscar la ciudad por nombre
            Ciudad ciudad = this.ciudadService.getCiudadporNombre(dto.getNombreCiudad());

            if (ciudad == null) {
                log.warn("No se encontró la ciudad: {}", dto.getNombreCiudad());
                return new ArrayList<>();
            }

            // Buscar circuitos por ID de ciudad
            List<CircuitoCiudad> circuitos = circuitoCiudadRepository.getCircuitosbyIdCiudad(ciudad.getId());

            log.info("Se encontraron {} circuitos para la ciudad: {}",
                    circuitos.size(), dto.getNombreCiudad());

            return circuitos;

        } catch (Exception e) {
            log.error("Error al buscar circuitos para la ciudad: {}", dto.getNombreCiudad(), e);
            throw new RuntimeException("Error interno al buscar circuitos", e);
        }
    }
}
