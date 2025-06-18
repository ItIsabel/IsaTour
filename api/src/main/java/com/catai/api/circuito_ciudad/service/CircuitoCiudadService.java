package com.catai.api.circuito_ciudad.service;

import com.catai.api.circuito.model.Circuito;
import com.catai.api.circuito_ciudad.model.CircuitoCiudad;
import com.catai.api.circuito_ciudad.model.FiltroDto;

import java.util.List;

public interface CircuitoCiudadService {
    public List<CircuitoCiudad> encuentraCircuitosenCiudad(FiltroDto dto);
}
