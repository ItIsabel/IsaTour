package com.catai.api.cases.tour.service;

import com.catai.api.cases.tour.TourRepository;
import com.catai.api.cases.tour.model.Tour;
import com.catai.api.cases.tour.model.TourFilterDto;
import com.catai.api.cases.tourCity.model.TourCity;
import com.catai.api.cases.tourCity.service.TourCityService;
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
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TourServiceTest {

    @Mock
    private TourRepository tourRepository;

    @Mock
    private TourCityService tourCityService;

    @InjectMocks
    private TourServiceImpl tourService;

    private Tour tour1;
    private Tour tour2;
    private TourFilterDto filtro;

    @BeforeEach
    void setUp() {
        tour1 = new Tour();
        tour1.setId(1L);
        tour1.setNombre("Tour Madrid");
        tour1.setDias(5);
        tour1.setTouroperador("Operator1");

        tour2 = new Tour();
        tour2.setId(2L);
        tour2.setNombre("Tour Barcelona");
        tour2.setDias(7);
        tour2.setTouroperador("Operator2");

        filtro = new TourFilterDto();
    }

    @Test
    void findToursWithFilters_DeberiaRetornarTodosLosTours_CuandoFiltroEsNulo() {
        List<Tour> tours = Arrays.asList(tour1, tour2);
        when(tourRepository.findAll()).thenReturn(tours);

        List<Tour> result = tourService.findToursWithFilters(null);

        assertEquals(2, result.size());
        assertEquals(tours, result);
        verify(tourRepository).findAll();
        verifyNoInteractions(tourCityService);
    }

    @Test
    void findToursWithFilters_DeberiaFiltrarPorPais_CuandoNombrePaisEstaPresente() {
        filtro.setNombrePais("Spain");
        TourCity tourCity1 = new TourCity();
        tourCity1.setCircuito(tour1);
        List<TourCity> tourCities = Arrays.asList(tourCity1);
        when(tourCityService.filterToursByCountry("Spain")).thenReturn(tourCities);

        List<Tour> result = tourService.findToursWithFilters(filtro);

        assertEquals(1, result.size());
        assertEquals(tour1, result.get(0));
        verify(tourCityService).filterToursByCountry("Spain");
        verifyNoMoreInteractions(tourRepository);
    }

    @Test
    void findToursWithFilters_DeberiaFiltrarPorCiudad_CuandoIdCiudadEstaPresente() {
        filtro.setIdCiudad(1L);
        TourCity tourCity1 = new TourCity();
        tourCity1.setCircuito(tour1);
        List<TourCity> tourCities = Arrays.asList(tourCity1);
        when(tourCityService.filterToursByCity(1L)).thenReturn(tourCities);

        List<Tour> result = tourService.findToursWithFilters(filtro);

        assertEquals(1, result.size());
        assertEquals(tour1, result.get(0));
        verify(tourCityService).filterToursByCity(1L);
        verifyNoMoreInteractions(tourRepository);
    }

    @Test
    void findToursWithFilters_DeberiaFiltrarPorDias_CuandoDiasEstaPresente() {
        filtro.setDias(5);
        List<Tour> tours = Arrays.asList(tour1, tour2);
        when(tourRepository.findAll()).thenReturn(tours);

        List<Tour> result = tourService.findToursWithFilters(filtro);

        assertEquals(1, result.size());
        assertEquals(tour1, result.get(0));
        verify(tourRepository).findAll();
        verifyNoInteractions(tourCityService);
    }

    @Test
    void findToursWithFilters_DeberiaFiltrarPorTouroperador_CuandoTouroperadorEstaPresente() {
        filtro.setTouroperador("Operator1");
        List<Tour> tours = Arrays.asList(tour1, tour2);
        when(tourRepository.findAll()).thenReturn(tours);

        List<Tour> result = tourService.findToursWithFilters(filtro);

        assertEquals(1, result.size());
        assertEquals(tour1, result.get(0));
        verify(tourRepository).findAll();
        verifyNoInteractions(tourCityService);
    }

    @Test
    void findToursWithFilters_DeberiaAplicarMultiplesFiltros_CuandoVariosFiltrosEstanPresentes() {
        filtro.setNombrePais("Spain");
        filtro.setDias(5);
        filtro.setTouroperador("Operator1");
        TourCity tourCity1 = new TourCity();
        tourCity1.setCircuito(tour1);
        TourCity tourCity2 = new TourCity();
        tourCity2.setCircuito(tour2);
        List<TourCity> tourCities = Arrays.asList(tourCity1, tourCity2);
        when(tourCityService.filterToursByCountry("Spain")).thenReturn(tourCities);

        List<Tour> result = tourService.findToursWithFilters(filtro);

        assertEquals(1, result.size());
        assertEquals(tour1, result.get(0));
        verify(tourCityService).filterToursByCountry("Spain");
        verifyNoMoreInteractions(tourRepository);
    }

    @Test
    void findToursWithFilters_DeberiaRetornarListaVacia_CuandoNoCoincidenFiltros() {
        filtro.setDias(10);
        List<Tour> tours = Arrays.asList(tour1, tour2);
        when(tourRepository.findAll()).thenReturn(tours);

        List<Tour> result = tourService.findToursWithFilters(filtro);

        assertTrue(result.isEmpty());
        verify(tourRepository).findAll();
        verifyNoInteractions(tourCityService);
    }
}
