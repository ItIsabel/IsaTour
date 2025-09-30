package com.catai.api.cases.city.service.country;

import com.catai.api.cases.city.model.City;
import com.catai.api.cases.city.service.city.CityService;
import com.catai.api.cases.tour.model.Tour;
import com.catai.api.cases.tour.model.TourFilterDto;
import com.catai.api.cases.tour.service.TourService;
import com.catai.api.cases.tourCity.model.TourCity;
import com.catai.api.cases.tourCity.service.TourCityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CountrySearchServiceImpl implements CountrySearchService {


    @Autowired
    CityService cityService;

    @Autowired
    TourService tourService;

    @Autowired
    TourCityService tourCityService;

    /**
     * {@inheritDoc}
     */
    public List<String> findCountriesWithTourFilters(TourFilterDto filtro) {
        List<String> filteredCountries = new ArrayList<>();

        // 1. Si no hay filtro, devuelve todos los paises.
        if (filtro == null) {
            List<City> listaCiudades = this.cityService.findCities();
            return listaCiudades.stream()
                    .map(City::getPais)
                    .distinct()
                    .collect(Collectors.toList());
        }

        //2. Si hay filtro de dias ó touroperadores , devuelve los paises que tengan itinerarios con esos días ó sean operados por este touroperador.

        List<Tour> toursWithFilters = this.tourService.findToursWithFilters(filtro);
        List<TourCity> relations = this.tourCityService.findCitiesByTours(toursWithFilters);
        for (TourCity relation : relations) {
            if (!filteredCountries.contains(relation.getCity().getPais())) {
                filteredCountries.add(relation.getCity().getPais());
            }
        }
        return filteredCountries;
    }
}
