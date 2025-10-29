package com.catai.api.cases.city;

import com.catai.api.cases.city.model.City;
import com.catai.api.cases.city.model.CityDto;
import com.catai.api.cases.city.service.city.CityService;
import com.catai.api.cases.city.service.country.CountrySearchService;
import com.catai.api.cases.tour.model.Tour;
import com.catai.api.cases.tour.model.TourFilterDto;
import com.catai.api.cases.tour.service.TourService;
import com.catai.api.cases.tourCity.service.TourCityService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Isabel Alvarez
 * @version 1.2.0
 * @since 1.0
 */
@RequestMapping(value = "/ciudades")
@RestController
@CrossOrigin(origins = "*")
@Slf4j
public class CityController {
    @Autowired
    CityService cityService;

    @Autowired
    CountrySearchService countrySearchService;

    @Autowired
    ModelMapper mapper;

    @Autowired
    TourCityService tourCityService;

    @Autowired
    TourService tourService;

    /**
     * Método para recuperar un listado de  {@link City} donde hay circuitos
     *
     * @return list de {@link CityDto}
     */
    @GetMapping
    public List<CityDto> todasCiudades() {
        List<City> lista = this.cityService.findCities();

        return lista.stream()
                .map(e -> mapper.map(e, CityDto.class))
                .sorted(Comparator.comparing(CityDto::getNombre))
                .collect(Collectors.toList());
    }

    /**
     * Método para recuperar un listado de paises donde hay circuitos.
     *
     * @return list de Pais
     */
    @PostMapping("/paises")
    public List<String> findCountries(@RequestBody (required = false) TourFilterDto filtro) {
        try {
            return this.countrySearchService.findCountriesWithTourFilters(filtro);
        } catch (Exception e) {
            throw new RuntimeException("Error al buscar países: " + e.getMessage(), e);
        }
    }

    /**
     * Método para obtener las ciudades de un circuito específico
     *
     * @param touroperador nombre del tour operador
     * @param tourId id del circuito
     * @return lista de ciudades del circuito
     */
    @GetMapping("/{touroperador}/{tourId}/ciudades")
    public ResponseEntity<List<CityDto>> getCiudadesByCircuito(@PathVariable String touroperador, @PathVariable Long tourId) {
        try {
            // Verificar que el circuito pertenece al touroperador
            Tour tour = tourService.findById(tourId);
            if (!tour.getTouroperador().equalsIgnoreCase(touroperador)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            List<City> ciudades = tourCityService.getCiudadesByTourId(tourId);
            List<CityDto> ciudadesDto = ciudades.stream()
                    .map(ciudad -> mapper.map(ciudad, CityDto.class))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(ciudadesDto);

        } catch (Exception e) {
            log.error("Error al obtener ciudades del circuito {}: {}", tourId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}


