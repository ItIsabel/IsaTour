package com.catai.api.cases.tour.service;

import com.catai.api.cases.tour.TourRepository;
import com.catai.api.cases.tour.model.Tour;
import com.catai.api.cases.tourCity.model.TourCity;
import com.catai.api.cases.tour.model.TourFilterDto;
import com.catai.api.cases.tourCity.service.TourCityService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class TourServiceImpl implements TourService {
    @Autowired
    TourRepository tourRepository;

    @Autowired
    TourCityService tourCityService;

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Tour> findToursWithFilters(TourFilterDto filtro) {
        List<Tour> filteredTours;
        if (filtro == null) {
            return this.tourRepository.findAll();
        }else{

        // 1. Aplicar filtro de ubicación (país o ciudad)
        filteredTours = applyLocationFilter(filtro);

        // 2. Aplicar filtro de dias
        filteredTours = applyDaysFilter(filteredTours, filtro.getDias());

        // 3. Aplicar filtro por touroperador (solo si hay filtro)
        filteredTours = applyTourOperatorFilter(filteredTours, filtro.getTouroperador());

        return filteredTours;
        }
    }

    /**
     * Aplica el filtro base por ubicación geográfica (país o ciudad)
     * @param filtro objeto con los filtros de ubicación (puede ser null)
     * @return lista de CircuitoCiudad filtrada por ubicación
     */
    private List<Tour> applyLocationFilter(TourFilterDto filtro) {
        List<Tour> locationFilteredTours = List.of();

        // 1. Filtrado por país
        if (filtro.getNombrePais() != null && !filtro.getNombrePais().isEmpty()) {
            log.debug("Aplicando filtro por país: {}", filtro.getNombrePais());
            locationFilteredTours = tourCityService.filterToursByCountry(filtro.getNombrePais()).stream().map(TourCity::getCircuito).collect(Collectors.toList());
        }
        // 2. Filtrado por ciudad
        else if (filtro.getIdCiudad() != null) {
            locationFilteredTours = this.tourCityService.filterToursByCity(filtro.getIdCiudad()).stream().map(TourCity::getCircuito).collect(Collectors.toList());
        }
        // 3. Si no hay filtro de localización, toma todos los circuitos.
        else
            locationFilteredTours= this.tourRepository.findAll();

        log.debug("Filtro de localización completado. Obtenidos: {} tours", locationFilteredTours.size());
        return locationFilteredTours;
    }


    /**
     * Aplica el filtro por número de días del circuito
     * @param tours lista base a filtrar
     * @param days número de días a filtrar
     * @return lista filtrada por días
     */
    private List<Tour> applyDaysFilter(List<Tour> tours, Integer days) {
        if (days == null) {
            return tours;
        }

        List<Tour> daysFilteredTours = tours.stream()
                .filter(cc -> cc.getDias() == days)
                .collect(Collectors.toList());

        log.debug("Filtro por {} días aplicado. Obtenidos: {} tours", days, daysFilteredTours.size());
        return daysFilteredTours;
    }

    /**
     * Aplica el filtro por touroperador
     * @param tours lista base a filtrar
     * @param touroperador nombre del touroperador a filtrar
     * @return lista filtrada por touroperador
     */
    private List<Tour> applyTourOperatorFilter(List<Tour> tours, String touroperador) {
        if (touroperador == null || touroperador.isEmpty()) {
            return tours;
        }

        List<Tour> touroperatorFilteredTours = tours.stream()
                .filter(cc -> touroperador.equals(cc.getTouroperador()))
                .collect(Collectors.toList());

        log.debug("Filtro por touroperador '{}' aplicado. Obtenidos: {} tours", touroperador, touroperatorFilteredTours.size());
        return touroperatorFilteredTours;
    }
}
