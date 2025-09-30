package com.catai.api.cases.city.service.city;

import com.catai.api.cases.city.CityRepository;
import com.catai.api.cases.city.model.City;
import com.catai.api.cases.tour.model.Tour;
import com.catai.api.cases.tour.model.TourFilterDto;
import com.catai.api.cases.tour.service.TourService;
import com.catai.api.cases.tourCity.model.TourCity;
import com.catai.api.cases.tourCity.service.TourCityService;
import jakarta.persistence.EntityNotFoundException;
import org.hibernate.validator.internal.util.stereotypes.Lazy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Isabel Alvarez
 * @version 1.0.1
 * @since 1.0
 */

@Service
@Transactional
public class CityServiceImpl implements CityService {

    @Autowired
    CityRepository cityRepository;


    /**
     * {@inheritDoc}
     */
    @Override
    public City getCityById(Long idCiudad) {
        return this.cityRepository.findById(idCiudad).orElseThrow(() ->
                new EntityNotFoundException("ID de ciudad no encontrado"));
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<City> findCities() {
        return this.cityRepository.findAll();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<City> findCitiesByCountry(String pais){
        return this.cityRepository.findByPais(pais);
    }


    }

