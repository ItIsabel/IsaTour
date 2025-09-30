package com.catai.api.cases.tour;

import com.catai.api.cases.tour.model.Tour;
import com.catai.api.cases.tour.model.TourDto;
import com.catai.api.cases.tour.service.TourService;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class TourControllerTest {

    @Mock
    private TourService tourService;

    @Mock
    private ModelMapper mapper;

    @InjectMocks
    private TourController tourController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;
    private TourFilterDto filtroDto;
    private Tour tour1;
    private TourDto tourDto1;
    private Tour tour2;
    private TourDto tourDto2;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(tourController).build();
        objectMapper = new ObjectMapper();

        filtroDto = new TourFilterDto();
        filtroDto.setNombrePais("Spain");

        tour1 = new Tour();
        tour1.setId(1L);
        tour1.setNombre("Tour Madrid");

        tourDto1 = new TourDto();
        tourDto1.setId(1L);
        tourDto1.setNombre("Tour Madrid");

        tour2 = new Tour();
        tour2.setId(2L);
        tour2.setNombre("Tour Barcelona");

        tourDto2 = new TourDto();
        tourDto2.setId(2L);
        tourDto2.setNombre("Tour Barcelona");
    }

    @Test
    void findToursWithFilters_DeberiaRetornarListaDeTours_CuandoExistenTours() throws Exception {
        List<Tour> tours = Arrays.asList(tour1, tour2);
        when(tourService.findToursWithFilters(any(TourFilterDto.class))).thenReturn(tours);
        when(mapper.map(tour1, TourDto.class)).thenReturn(tourDto1);
        when(mapper.map(tour2, TourDto.class)).thenReturn(tourDto2);

        mockMvc.perform(post("/circuitos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(filtroDto)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].nombre").value("Tour Madrid"))
                .andExpect(jsonPath("$[1].nombre").value("Tour Barcelona"));

        verify(tourService).findToursWithFilters(any(TourFilterDto.class));
        verify(mapper).map(tour1, TourDto.class);
        verify(mapper).map(tour2, TourDto.class);
    }

    @Test
    void findToursWithFilters_DeberiaRetornarListaVacia_CuandoNoExistenTours() throws Exception {
        when(tourService.findToursWithFilters(any(TourFilterDto.class))).thenReturn(Collections.emptyList());

        mockMvc.perform(post("/circuitos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(filtroDto)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(0));

        verify(tourService).findToursWithFilters(any(TourFilterDto.class));
        verifyNoInteractions(mapper);
    }

    @Test
    void findToursWithFilters_DeberiaRetornarInternalServerError_CuandoOcurreExcepcion() throws Exception {
        when(tourService.findToursWithFilters(any(TourFilterDto.class))).thenThrow(new RuntimeException("Error"));

        mockMvc.perform(post("/circuitos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(filtroDto)))
                .andExpect(status().isInternalServerError());

        verify(tourService).findToursWithFilters(any(TourFilterDto.class));
        verifyNoInteractions(mapper);
    }

    @Test
    void findToursWithFilters_DeberiaManejarFiltroNulo_CuandoRequestBodyEsNulo() throws Exception {
        when(tourService.findToursWithFilters(null)).thenReturn(Arrays.asList(tour1));
        when(mapper.map(tour1, TourDto.class)).thenReturn(tourDto1);

        mockMvc.perform(post("/circuitos")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(1));

        verify(tourService).findToursWithFilters(null);
        verify(mapper).map(tour1, TourDto.class);
    }
}
