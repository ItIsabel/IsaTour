package com.catai.api.cases.circuitoCiudad;

import com.catai.api.cases.circuito.model.Circuito;
import com.catai.api.cases.circuitoCiudad.model.CircuitoCiudad;
import com.catai.api.cases.circuitoCiudad.model.CircuitoCiudadDto;
import com.catai.api.cases.circuitoCiudad.model.FiltroDto;
import com.catai.api.cases.circuitoCiudad.service.CircuitoCiudadService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */
@RequestMapping(value = "/buscar")
@RestController
@CrossOrigin(origins = "*")
@Slf4j
public class CircuitoCiudadController {
    @Autowired
    CircuitoCiudadService circuitoCiudadService;

    @Autowired
    ModelMapper mapper;

    /**
     * Método para recuperar un listado de circuitos {@link Circuito} por ciudad
     *
     * @param dto dto de búsqueda
     * @return list de {@link CircuitoCiudadDto}
     */
    @PostMapping
    public ResponseEntity<List<CircuitoCiudadDto>> encuentraCircuitosenCiudad(@RequestBody FiltroDto dto) {
        try {
            List<CircuitoCiudad> circuitos = this.circuitoCiudadService.encuentraCircuitosenCiudad(dto);

            List<CircuitoCiudadDto> circuitosDto = circuitos.stream()
                    .map(circuito -> mapper.map(circuito, CircuitoCiudadDto.class))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(circuitosDto);

        } catch (IllegalArgumentException e) {
            log.warn("Parámetros inválidos: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            log.error("Error al buscar circuitos en ciudad: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Método para recuperar un listado de circuitos {@link Circuito} por país
     *
     * @param country Nombre del país
     * @return list de {@link Circuito}
     */
    @GetMapping("/por-pais/{country}")
    public ResponseEntity<List<Circuito>> findCircuitosByCountry(@PathVariable String country) {
        try {
            List<Circuito> circuitos = this.circuitoCiudadService.findCircuitosByCountry(country);
            return ResponseEntity.ok(circuitos);
        } catch (Exception e) {
            log.error("Error al buscar circuitos por país: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
