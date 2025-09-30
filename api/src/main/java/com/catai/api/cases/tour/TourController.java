package com.catai.api.cases.tour;

import com.catai.api.cases.tour.model.Tour;
import com.catai.api.cases.tour.model.TourDto;
import com.catai.api.cases.tour.service.TourService;
import com.catai.api.cases.tour.model.TourFilterDto;
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
 * @version 1.0.1
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
            List<TourDto> circuitosDto = this.tourService
                    .findToursWithFilters(filtro)
                    .stream()
                    .map(circuito -> mapper.map(circuito, TourDto.class))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(circuitosDto);

        } catch (Exception e) {
            log.error("Error al buscar circuitos con filtros: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
