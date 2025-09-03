package com.catai.api.cases.circuitoCiudad.service;

import com.catai.api.cases.circuito.model.Circuito;
import com.catai.api.cases.circuitoCiudad.CircuitoCiudadRepository;
import com.catai.api.cases.circuitoCiudad.model.CircuitoCiudad;
import com.catai.api.cases.circuitoCiudad.model.FiltroDto;
import com.catai.api.cases.ciudad.model.Ciudad;
import com.catai.api.cases.ciudad.service.CiudadService;
import lombok.extern.slf4j.Slf4j;
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

    public List<Circuito> findCircuitosByCountry(String country) {
        List<CircuitoCiudad> circuitoCiudades = circuitoCiudadRepository.findByCiudadPais(country);
        return circuitoCiudades.stream()
                .map(CircuitoCiudad::getCircuito)
                .distinct()
                .toList();
    }

    /**
     * {@inheritDoc}
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
            List<CircuitoCiudad> circuitos = circuitoCiudadRepository.findByCiudadId(ciudad.getId());

            log.info("Se encontraron {} circuitos para la ciudad: {}",
                    circuitos.size(), dto.getNombreCiudad());

            return circuitos;

        } catch (Exception e) {
            log.error("Error al buscar circuitos para la ciudad: {}", dto.getNombreCiudad(), e);
            throw new RuntimeException("Error interno al buscar circuitos", e);
        }
    }
}
