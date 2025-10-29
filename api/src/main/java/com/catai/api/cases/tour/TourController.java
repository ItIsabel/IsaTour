package com.catai.api.cases.tour;

import com.catai.api.cases.tour.model.*;
import com.catai.api.cases.tour.service.TourService;
import com.catai.api.cases.tourCity.service.TourCityService;
import com.catai.api.cases.tourMonth.service.TourMonthService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Isabel Alvarez
 * @version 1.2.0
 * @since 1.0
 */
@RequestMapping(value = "/circuitos")
@RestController
@CrossOrigin(origins = "*")
@Slf4j
public class TourController {

    @Autowired
    TourService tourService;

    @Autowired
    TourCityService tourCityService;

    @Autowired
    TourMonthService tourMonthService;

    @Autowired
    ModelMapper mapper;

    /**
     * Método para recuperar un listado de circuitos {@link Tour} aplicando filtros
     *
     * @param filtro dto con filtros
     * @return list de {@link TourDto}
     */
    @PostMapping("")
    public ResponseEntity<List<TourDto>> findToursWithFilters(@RequestBody (required = false) TourFilterDto filtro) {
        try {
            List<Tour> tours = this.tourService.findToursWithFilters(filtro);
            List<TourDto> circuitosDto = tours.stream()
                    .map(circuito -> mapper.map(circuito, TourDto.class))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(circuitosDto);

        } catch (Exception e) {
            log.error("Error al buscar circuitos con filtros: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Método para recuperar circuitos de un tour operador específico
     *
     * @param touroperador nombre del tour operador
     * @return list de {@link TourDto} del tour operador
     */
    @GetMapping("/{touroperador}")
    public ResponseEntity<List<TourDto>> findToursByTourOperador(@PathVariable String touroperador) {
        try {
            List<Tour> circuitos = this.tourService.findToursByTourOperador(touroperador);
            List<TourDto> circuitosDto = circuitos.stream()
                    .map(circuito -> mapper.map(circuito, TourDto.class))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(circuitosDto);

        } catch (Exception e) {
            log.error("Error al buscar circuitos del tour operador {}: {}", touroperador, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Método para eliminar un circuito de un tour operador específico
     *
     * @param touroperador nombre del tour operador
     * @param tourId id del circuito
     * @return ResponseEntity indicando el resultado
     */
    @DeleteMapping("/{touroperador}/{tourId}")
    public ResponseEntity<Void> deleteCircuito(@PathVariable String touroperador, @PathVariable Long tourId) {
        try {
            this.tourService.deleteCircuito(touroperador, tourId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Error al eliminar circuito {} del tour operador {}: {}", tourId, touroperador, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Método para crear un nuevo circuito para un tour operador
     *
     * @param touroperador nombre del tour operador
     * @return el circuito creado
     */
    @PostMapping("/{touroperador}")
    public ResponseEntity<TourDto> createCircuito(@PathVariable String touroperador, @RequestBody CreateTourRequest request) {
        try {
            Tour tour = mapper.map(request.getTour(), Tour.class);
            Tour createdTour = tourService.createCircuito(touroperador, tour, request.getCiudades(), request.getMeses());
            TourDto responseDto = mapper.map(createdTour, TourDto.class);
            return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
        } catch (Exception e) {
            log.error("Error al crear circuito para tour operador {}: {}", touroperador, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Método para actualizar un circuito existente
     *
     * @param touroperador nombre del tour operador
     * @param tourId id del circuito
     * @return el circuito actualizado
     */
    @PutMapping("/{touroperador}/{tourId}")
    public ResponseEntity<TourDto> updateCircuito(@PathVariable String touroperador, @PathVariable Long tourId, @RequestBody UpdateTourRequest request) {
        try {
            Tour tour = mapper.map(request.getTour(), Tour.class);
            Tour updatedTour = tourService.updateCircuito(touroperador, tourId, tour, request.getCiudades(), request.getMeses());
            TourDto responseDto = mapper.map(updatedTour, TourDto.class);
            return ResponseEntity.ok(responseDto);
        } catch (Exception e) {
            log.error("Error al actualizar circuito {} para tour operador {}: {}", tourId, touroperador, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
