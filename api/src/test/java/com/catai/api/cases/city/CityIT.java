package com.catai.api.cases.city;

import com.catai.api.cases.city.model.City;
import com.catai.api.cases.city.model.CityDto;
import com.catai.api.cases.city.service.city.CityService;
import com.catai.api.cases.city.service.country.CountrySearchService;
import com.catai.api.cases.tour.model.TourFilterDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class CityIT {

    @Mock
    private CityService cityService;

    @Mock
    private CountrySearchService countrySearchService;

    @Mock
    private ModelMapper mapper;

    @InjectMocks
    private CityController cityController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;
    private TourFilterDto filtroDto;
    private City city1;
    private CityDto cityDto1;
    private City city2;
    private CityDto cityDto2;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(cityController).build();
        objectMapper = new ObjectMapper();

        filtroDto = new TourFilterDto();

        city1 = new City();
        city1.setId(1L);
        city1.setNombre("Madrid");

        cityDto1 = new CityDto();
        cityDto1.setId(1L);
        cityDto1.setNombre("Madrid");

        city2 = new City();
        city2.setId(2L);
        city2.setNombre("Barcelona");

        cityDto2 = new CityDto();
        cityDto2.setId(2L);
        cityDto2.setNombre("Barcelona");
    }

    @Test
    void todasCiudades_DeberiaRetornarListaOrdenada_CuandoExistenCiudades() throws Exception {
        List<City> cities = Arrays.asList(city2, city1);
        when(cityService.findCities()).thenReturn(cities);
        when(mapper.map(city1, CityDto.class)).thenReturn(cityDto1);
        when(mapper.map(city2, CityDto.class)).thenReturn(cityDto2);

        mockMvc.perform(get("/ciudades"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].nombre").value("Barcelona"))
                .andExpect(jsonPath("$[1].nombre").value("Madrid"));

        verify(cityService).findCities();
        verify(mapper, times(2)).map(any(City.class), eq(CityDto.class));
    }

    @Test
    void todasCiudades_DeberiaRetornarListaVacia_CuandoNoExistenCiudades() throws Exception {
        when(cityService.findCities()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/ciudades"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(0));

        verify(cityService).findCities();
        verifyNoInteractions(mapper);
    }

    @Test
    void findCountries_DeberiaRetornarListaDePaises_CuandoExistenPaises() throws Exception {
        List<String> countries = Arrays.asList("Spain", "France");
        when(countrySearchService.findCountriesWithTourFilters(any(TourFilterDto.class))).thenReturn(countries);

        mockMvc.perform(post("/ciudades/paises")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(filtroDto)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0]").value("Spain"))
                .andExpect(jsonPath("$[1]").value("France"));

        verify(countrySearchService).findCountriesWithTourFilters(any(TourFilterDto.class));
    }

    @Test
    void findCountries_DeberiaRetornarListaVacia_CuandoNoExistenPaises() throws Exception {
        when(countrySearchService.findCountriesWithTourFilters(any(TourFilterDto.class))).thenReturn(Collections.emptyList());

        mockMvc.perform(post("/ciudades/paises")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(filtroDto)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(0));

        verify(countrySearchService).findCountriesWithTourFilters(any(TourFilterDto.class));
    }

}
