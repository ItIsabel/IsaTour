package com.catai.api.cases.city.service.city;

import com.catai.api.cases.city.CityRepository;
import com.catai.api.cases.city.model.City;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CityServiceTest {

    @Mock
    private CityRepository cityRepository;

    @InjectMocks
    private CityServiceImpl cityService;

    private City city1;
    private City city2;

    @BeforeEach
    void setUp() {
        city1 = new City();
        city1.setId(1L);
        city1.setNombre("Madrid");

        city2 = new City();
        city2.setId(2L);
        city2.setNombre("Barcelona");
    }

    @Test
    void findCities_DeberiaRetornarListaDeCiudades_CuandoExistenCiudades() {
        List<City> cities = Arrays.asList(city1, city2);
        when(cityRepository.findAll()).thenReturn(cities);

        List<City> result = cityService.findCities();

        assertEquals(2, result.size());
        assertEquals(cities, result);
        verify(cityRepository).findAll();
    }

    @Test
    void findCities_DeberiaRetornarListaVacia_CuandoNoExistenCiudades() {
        when(cityRepository.findAll()).thenReturn(Collections.emptyList());

        List<City> result = cityService.findCities();

        assertTrue(result.isEmpty());
        verify(cityRepository).findAll();
    }

    @Test
    void getCityById_DeberiaRetornarCiudad_CuandoExiste() {
        when(cityRepository.findById(1L)).thenReturn(Optional.of(city1));

        City result = cityService.getCityById(1L);

        assertEquals(city1, result);
        verify(cityRepository).findById(1L);
    }

    @Test
    void getCityById_DeberiaLanzarEntityNotFoundException_CuandoNoExiste() {
        when(cityRepository.findById(anyLong())).thenReturn(Optional.empty());

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> {
            cityService.getCityById(1L);
        });

        assertEquals("ID de ciudad no encontrado", exception.getMessage());
        verify(cityRepository).findById(1L);
    }

    @Test
    void findCitiesByCountry_DeberiaRetornarListaDeCiudades_CuandoExistenEnElPais() {
        List<City> cities = Arrays.asList(city1);
        when(cityRepository.findByPais("Spain")).thenReturn(cities);

        List<City> result = cityService.findCitiesByCountry("Spain");

        assertEquals(1, result.size());
        assertEquals(cities, result);
        verify(cityRepository).findByPais("Spain");
    }

    @Test
    void findCitiesByCountry_DeberiaRetornarListaVacia_CuandoNoExistenEnElPais() {
        when(cityRepository.findByPais(anyString())).thenReturn(Collections.emptyList());

        List<City> result = cityService.findCitiesByCountry("France");

        assertTrue(result.isEmpty());
        verify(cityRepository).findByPais("France");
    }
}
