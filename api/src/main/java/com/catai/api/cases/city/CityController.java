package com.catai.api.cases.city;

import com.catai.api.cases.city.model.City;
import com.catai.api.cases.city.model.CityDto;
import com.catai.api.cases.city.service.city.CityService;
import com.catai.api.cases.city.service.country.CountrySearchService;
import com.catai.api.cases.tour.model.TourFilterDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */
@RequestMapping(value = "/ciudades")
@RestController
@CrossOrigin(origins = "*")
public class CityController {
    @Autowired
    CityService cityService;

    @Autowired
    CountrySearchService countrySearchService;

    @Autowired
    ModelMapper mapper;

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

}


