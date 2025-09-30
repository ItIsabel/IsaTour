package com.catai.api.cases.tourCity.service;

import com.catai.api.cases.city.model.City;
import com.catai.api.cases.city.service.city.CityService;
import com.catai.api.cases.tour.model.Tour;
import com.catai.api.cases.tourCity.TourCityRepository;
import com.catai.api.cases.tourCity.model.TourCity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TourCityServiceTest {

    @Mock
    private TourCityRepository tourCityRepository;

    @Mock
    private CityService cityService;

    @InjectMocks
    private TourCityServiceImpl tourCityService;

    private TourCity tourCity1;
    private TourCity tourCity2;
    private Tour tour1;
    private Tour tour2;
    private City city1;

    @BeforeEach
    void setUp() {
        tour1 = new Tour();
        tour1.setId(1L);
        tour1.setNombre("Tour Madrid");

        tour2 = new Tour();
        tour2.setId(2L);
        tour2.setNombre("Tour Barcelona");

        city1 = new City();
        city1.setId(1L);
        city1.setNombre("Madrid");
        city1.setPais("Spain");

        tourCity1 = new TourCity();
        tourCity1.setId(1L);
        tourCity1.setCircuito(tour1);

        tourCity2 = new TourCity();
        tourCity2.setId(2L);
        tourCity2.setCircuito(tour2);
    }

    @Test
    void filterToursByCity_DeberiaRetornarListaDeTourCity_CuandoExistenTours() {
        when(cityService.getCityById(1L)).thenReturn(city1);
        when(tourCityRepository.findByCityId(1L)).thenReturn(Arrays.asList(tourCity1, tourCity2));

        List<TourCity> result = tourCityService.filterToursByCity(1L);

        assertEquals(2, result.size());
        assertTrue(result.contains(tourCity1));
        assertTrue(result.contains(tourCity2));
        verify(cityService).getCityById(1L);
        verify(tourCityRepository).findByCityId(1L);
    }

    @Test
    void filterToursByCity_DeberiaRetornarListaVacia_CuandoCiudadNoExiste() {
        when(cityService.getCityById(99L)).thenThrow(new RuntimeException("ID de ciudad no encontrado"));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            tourCityService.filterToursByCity(99L);
        });

        assertEquals("Error al filtrar por ciudad", exception.getMessage());
        verify(cityService).getCityById(99L);
        verifyNoInteractions(tourCityRepository);
    }

    @Test
    void filterToursByCountry_DeberiaRetornarListaDeTourCity_CuandoExistenTours() {
        List<City> cities = Arrays.asList(city1);
        when(cityService.findCitiesByCountry("Spain")).thenReturn(cities);
        when(tourCityRepository.findByCityId(1L)).thenReturn(Arrays.asList(tourCity1));

        List<TourCity> result = tourCityService.filterToursByCountry("Spain");

        assertEquals(1, result.size());
        assertTrue(result.contains(tourCity1));
        verify(cityService).findCitiesByCountry("Spain");
        verify(tourCityRepository).findByCityId(1L);
    }

    @Test
    void filterToursByCountry_DeberiaRetornarListaVacia_CuandoNoExistenCiudades() {
        when(cityService.findCitiesByCountry("France")).thenReturn(Collections.emptyList());

        List<TourCity> result = tourCityService.filterToursByCountry("France");

        assertTrue(result.isEmpty());
        verify(cityService).findCitiesByCountry("France");
        verifyNoInteractions(tourCityRepository);
    }

    @Test
    void findCitiesByTours_DeberiaRetornarListaDeTourCity_CuandoExistenTours() {
        List<Tour> tours = Arrays.asList(tour1, tour2);
        List<Long> tourIds = Arrays.asList(1L, 2L);
        when(tourCityRepository.findByTourIdIn(tourIds)).thenReturn(Arrays.asList(tourCity1, tourCity2));

        List<TourCity> result = tourCityService.findCitiesByTours(tours);

        assertEquals(2, result.size());
        assertTrue(result.contains(tourCity1));
        assertTrue(result.contains(tourCity2));
        verify(tourCityRepository).findByTourIdIn(tourIds);
    }

    @Test
    void findCitiesByTours_DeberiaRetornarListaVacia_CuandoNoExistenTours() {
        when(tourCityRepository.findByTourIdIn(anyList())).thenReturn(Collections.emptyList());

        List<TourCity> result = tourCityService.findCitiesByTours(Collections.emptyList());

        assertTrue(result.isEmpty());
        verify(tourCityRepository).findByTourIdIn(Collections.emptyList());
    }
}
