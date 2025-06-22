package com.catai.api.cases.circuito_ciudad.service;

import com.catai.api.cases.circuito_ciudad.model.CircuitoCiudad;
import com.catai.api.cases.circuito_ciudad.model.FiltroDto;

import java.util.List;

public interface CircuitoCiudadService {

    public List<CircuitoCiudad> encuentraCircuitosenCiudad(FiltroDto dto) throws Exception;
}
