package com.catai.api.cases.tourCity.service;

import com.catai.api.cases.tour.TourRepository;
import com.catai.api.cases.tour.model.Tour;
import com.catai.api.cases.tourCity.TourCityRepository;
import com.catai.api.cases.tourCity.model.TourCity;
import com.catai.api.cases.city.model.City;
import com.catai.api.cases.city.service.city.CityService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Isabel Alvarez
 * @version 1.2.0
 * @since 1.0
 */

@Service
public class TourCityServiceImpl implements TourCityService {

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(TourCityServiceImpl.class);

    @Autowired
    CityService cityService;

    @Autowired
    TourCityRepository tourCityRepository;

    @Autowired
    TourRepository tourRepository;


    /**
     * Filtra los CircuitoCiudad por id de ciudad
     * @param idCiudad nombre de la ciudad a buscar
     * @return lista de CircuitoCiudad para la ciudad especificada
     */
    public List<TourCity> filterToursByCity(Long idCiudad) {
        try {
            // Buscar la ciudad por nombre
            City city = this.cityService.getCityById(idCiudad);

            if (city == null) {
                log.warn("No se encontró la ciudad id: {}", idCiudad);
                return new ArrayList<>();
            }

            // Buscar circuitos por ID de ciudad
            List<TourCity> circuitoCiudades = tourCityRepository.findByCityId(city.getId());
            log.info("Se encontraron {} circuitos-ciudades para la ciudad: {}", circuitoCiudades.size(), idCiudad);

            return circuitoCiudades;

        } catch (Exception e) {
            log.error("Error al buscar circuitos para la ciudad: {}", idCiudad, e);
            throw new RuntimeException("Error al filtrar por ciudad");
        }
    }


    /**
     * Filtra los CircuitoCiudad por nombre de Pais
     * @param nombrePais nombre del pais a buscar
     * @return lista de CircuitoCiudad para el pais concreto.
     */
    public List<TourCity> filterToursByCountry(String nombrePais) {
        try {
            // Buscar las ciudades del país
            List<City> ciudades = this.cityService.findCitiesByCountry(nombrePais);
            log.info("Se encontraron {} ciudades para el país: {}", ciudades.size(), nombrePais);

            // Set para controlar los IDs de tours ya procesados
            Set<Long> tourIdsVistos = new HashSet<>();
            List<TourCity> circuitosUnicos = new ArrayList<>();

            // Iterar por cada ciudad
            for (City city : ciudades) {
                // Buscar circuitos por cada id de ciudad
                List<TourCity> circuitosCiudad = tourCityRepository.findByCityId(city.getId());

                // Añadir solo los circuitos cuyo Tour no esté ya en la lista
                for (TourCity circuito : circuitosCiudad) {
                    Long tourId = circuito.getCircuito().getId();
                    if (!tourIdsVistos.contains(tourId.longValue())) {
                        tourIdsVistos.add(tourId.longValue());
                        circuitosUnicos.add(circuito);
                    }
                }
            }

            log.info("Total de circuitos únicos encontrados para el país {}: {}",
                    nombrePais, circuitosUnicos.size());

            return circuitosUnicos;

        } catch (Exception e) {
            log.error("Error al filtrar por país: {} - {}", nombrePais, e.getMessage(), e);
            throw new RuntimeException("Error al filtrar por país: " + nombrePais, e);
        }
    }

    /**
     * Filtra los CircuitoCiudad por id del Circuito
     * @param tours lista de circuitos
     * @return lista de CircuitoCiudad con las ciudades por las que pasan los circuitos pasados por parámetro
     */
    public List<TourCity> findCitiesByTours (List<Tour> tours) {
       try{
        // Obtener IDs de tours para consulta más eficiente
        List<Long> tourIds = tours.stream()
                .map(Tour::getId)
                .collect(Collectors.toList());

        // Una sola consulta en lugar de un bucle
        return tourCityRepository.findByTourIdIn(tourIds);

        } catch (Exception e) {
            log.error("Error al encontrar tours en las ciudades - en tourCityServiceImpl- {}", e.getMessage(), e);
            throw new RuntimeException("Error al encontrar tours en las ciudades. ", e);
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<City> getCiudadesByTourId(Long tourId) {
        List<TourCity> tourCities = tourCityRepository.findByTourId(tourId);
        return tourCities.stream()
                .map(TourCity::getCity)
                .collect(Collectors.toList());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public void updateCitiesofaTour(Long tourId, List<Long> ciudades) {
        // Verificar que el circuito existe
        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new RuntimeException("Circuito no encontrado"));

        // Eliminar ciudades existentes
        tourCityRepository.deleteByTourId(tourId);

        // Agregar nuevas ciudades
        if (ciudades != null && !ciudades.isEmpty()) {
            for (Long ciudadId : ciudades) {
                // Verificar si ya existe la relación
                boolean exists = tourCityRepository.findByTourId(tourId).stream()
                    .anyMatch(tc -> tc.getCity().getId().equals(ciudadId));

                if (!exists) {
                    TourCity tourCity = new TourCity();
                    tourCity.setCircuito(tour);
                    City city = cityService.getCityById(ciudadId);
                    if (city != null) {
                        tourCity.setCity(city);
                        tourCityRepository.save(tourCity);
                    } else {
                        log.warn("Ciudad no encontrada con ID: {}", ciudadId);
                    }
                } else {
                    log.info("Relación circuito-ciudad ya existe para circuito {} y ciudad {}, saltando", tourId, ciudadId);
                }
            }
        }

        log.info("Ciudades actualizadas para circuito {}: {}", tourId, ciudades);
    }
}


