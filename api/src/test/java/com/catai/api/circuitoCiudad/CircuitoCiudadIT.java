package com.catai.api.circuitoCiudad;
import com.catai.api.cases.circuito.model.Circuito;
import com.catai.api.cases.circuito.model.CircuitoDto;
import com.catai.api.cases.circuitoCiudad.CircuitoCiudadController;
import com.catai.api.cases.circuitoCiudad.model.CircuitoCiudadDto;
import com.catai.api.cases.circuitoCiudad.model.FiltroDto;
import com.catai.api.cases.circuitoCiudad.model.CircuitoCiudad;
import com.catai.api.cases.circuitoCiudad.service.CircuitoCiudadService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class CircuitoCiudadIT {
    @Mock
    private CircuitoCiudadService circuitoCiudadService;

    @Mock
    private ModelMapper mapper;


    @InjectMocks
    private CircuitoCiudadController circuitoCiudadController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;
    private FiltroDto filtroDto;
    private CircuitoCiudad circuitoCiudad1;
    private CircuitoCiudadDto circuitoCiudadDto1;

    private CircuitoCiudad circuitoCiudad2;
    private CircuitoCiudadDto circuitoCiudadDto2;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(circuitoCiudadController).build();
        objectMapper = new ObjectMapper();

        // Datos de prueba
        filtroDto = new FiltroDto();

        //Datos de prueba
        
        //circuito 1
        Circuito circuito= new Circuito();
        circuito.setNombre("Circuito Madrid Centro");
        circuito.setId(1L);

        CircuitoDto circuitoDto= new CircuitoDto();
        circuitoDto.setNombre("Circuito Madrid Centro");
        circuitoDto.setId(1L);

        circuitoCiudad1 = new CircuitoCiudad();
        circuitoCiudad1.setCircuito(circuito);

        circuitoCiudadDto1 = new CircuitoCiudadDto();
        circuitoCiudadDto1.setCircuito(circuitoDto);


        //circuito 2
        Circuito circuito2 = new Circuito();
        circuito2.setId(2L);
        circuito2.setNombre("Circuito Barcelona Centro");

        CircuitoDto circuitoDto2= new CircuitoDto();
        circuitoDto2.setNombre("Circuito Barcelona Centro");
        circuitoDto2.setId(2L);


        circuitoCiudad2 = new CircuitoCiudad();
        circuitoCiudad2.setCircuito(circuito2);

        circuitoCiudadDto2 = new CircuitoCiudadDto();
        circuitoCiudadDto2.setCircuito(circuitoDto2);


    }


    @Test
    void encuentraCircuitosenCiudad_DeberiaRetornarListaVacia_CuandoNoExistenResultados() throws Exception {
        // Given
        when(circuitoCiudadService.encuentraCircuitosenCiudad(any(FiltroDto.class)))
                .thenReturn(Collections.emptyList());

        // When & Then
        mockMvc.perform(post("/buscar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(filtroDto)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(0));

        verify(circuitoCiudadService).encuentraCircuitosenCiudad(any(FiltroDto.class));
        verifyNoInteractions(mapper);
    }

    @Test
    void encuentraCircuitosenCiudad_DeberiaRetornarBadRequest_CuandoParametrosInvalidos() throws Exception {
        // Given
        when(circuitoCiudadService.encuentraCircuitosenCiudad(any(FiltroDto.class)))
                .thenThrow(new IllegalArgumentException("Parámetros inválidos"));

        // When & Then
        mockMvc.perform(post("/buscar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(filtroDto)))
                .andExpect(status().isBadRequest());

        verify(circuitoCiudadService).encuentraCircuitosenCiudad(any(FiltroDto.class));
        verifyNoInteractions(mapper);
    }

    @Test
    void encuentraCircuitosenCiudad_DeberiaRetornarInternalServerError_CuandoExcepcionGenerica() throws Exception {
        // Given
        when(circuitoCiudadService.encuentraCircuitosenCiudad(any(FiltroDto.class)))
                .thenThrow(new RuntimeException("Error inesperado"));

        // When & Then
        mockMvc.perform(post("/buscar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(filtroDto)))
                .andExpect(status().isInternalServerError());

        verify(circuitoCiudadService).encuentraCircuitosenCiudad(any(FiltroDto.class));
        verifyNoInteractions(mapper);
    }

    @Test
    void encuentraCircuitosenCiudad_DeberiaRetornarBadRequest_CuandoRequestBodyVacio() throws Exception {
        // When & Then
        mockMvc.perform(post("/buscar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(""))
                .andExpect(status().isBadRequest());
    }

    @Test
    void encuentraCircuitosenCiudad_DeberiaRetornarBadRequest_CuandoJsonInvalido() throws Exception {
        // When & Then
        mockMvc.perform(post("/buscar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{invalid json"))
                .andExpect(status().isBadRequest());
    }

    // Tests unitarios adicionales para el método del controlador directamente
    @Test
    void encuentraCircuitosenCiudad_MetodoDirecto_DeberiaRetornarOk_CuandoExistenResultados() throws Exception {
        // Given
        List<CircuitoCiudad> circuitos = Arrays.asList(circuitoCiudad1);
        when(circuitoCiudadService.encuentraCircuitosenCiudad(filtroDto))
                .thenReturn(circuitos);
        when(mapper.map(circuitoCiudad1, CircuitoCiudadDto.class))
                .thenReturn(circuitoCiudadDto1);

        // When
        ResponseEntity<List<CircuitoCiudadDto>> response =
                circuitoCiudadController.encuentraCircuitosenCiudad(filtroDto);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        assertEquals(circuitoCiudadDto1, response.getBody().get(0));

        verify(circuitoCiudadService).encuentraCircuitosenCiudad(filtroDto);
        verify(mapper).map(circuitoCiudad1, CircuitoCiudadDto.class);
    }

    @Test
    void encuentraCircuitosenCiudad_MetodoDirecto_DeberiaRetornarBadRequest_CuandoIllegalArgumentException() throws Exception {
        // Given
        when(circuitoCiudadService.encuentraCircuitosenCiudad(filtroDto))
                .thenThrow(new IllegalArgumentException("Parámetros inválidos"));

        // When - El controlador maneja la excepción internamente
        ResponseEntity<List<CircuitoCiudadDto>> response =
                circuitoCiudadController.encuentraCircuitosenCiudad(filtroDto);

        // Then
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNull(response.getBody());

        verify(circuitoCiudadService).encuentraCircuitosenCiudad(filtroDto);
        verifyNoInteractions(mapper);
    }

    @Test
    void encuentraCircuitosenCiudad_MetodoDirecto_DeberiaRetornarInternalServerError_CuandoExcepcionGenerica() throws Exception {
        // Given
        when(circuitoCiudadService.encuentraCircuitosenCiudad(filtroDto))
                .thenThrow(new RuntimeException("Error inesperado"));

        // When - El controlador maneja la excepción internamente
        ResponseEntity<List<CircuitoCiudadDto>> response =
                circuitoCiudadController.encuentraCircuitosenCiudad(filtroDto);

        // Then
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertNull(response.getBody());

        verify(circuitoCiudadService).encuentraCircuitosenCiudad(filtroDto);
        verifyNoInteractions(mapper);
    }

    @Test
    void encuentraCircuitosenCiudad_DeberiaMapearCorrectamente_CuandoMultiplesResultados() throws Exception {
        // Given
        List<CircuitoCiudad> circuitos = Arrays.asList(circuitoCiudad1, circuitoCiudad2);

        when(circuitoCiudadService.encuentraCircuitosenCiudad(filtroDto))
                .thenReturn(circuitos);
        when(mapper.map(circuitoCiudad1, CircuitoCiudadDto.class))
                .thenReturn(circuitoCiudadDto1);
        when(mapper.map(circuitoCiudad2, CircuitoCiudadDto.class))
                .thenReturn(circuitoCiudadDto2);

        // When
        ResponseEntity<List<CircuitoCiudadDto>> response =
                circuitoCiudadController.encuentraCircuitosenCiudad(filtroDto);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(2, response.getBody().size());
        assertTrue(response.getBody().contains(circuitoCiudadDto1));
        assertTrue(response.getBody().contains(circuitoCiudadDto2));
    }

    @Test
    void encuentraCircuitosenCiudad_MetodoDirecto_DeberiaRetornarListaVacia_CuandoNoHayResultados() throws Exception {
        // Given
        when(circuitoCiudadService.encuentraCircuitosenCiudad(filtroDto))
                .thenReturn(Collections.emptyList());

        // When
        ResponseEntity<List<CircuitoCiudadDto>> response =
                circuitoCiudadController.encuentraCircuitosenCiudad(filtroDto);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isEmpty());
    }
}
