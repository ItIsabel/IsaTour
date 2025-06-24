package com.catai.api.cases.circuitoCiudad.service;

import com.catai.api.cases.circuitoCiudad.model.CircuitoCiudad;
import com.catai.api.cases.circuitoCiudad.model.FiltroDto;

import java.util.List;

public interface CircuitoCiudadService {

    public List<CircuitoCiudad> encuentraCircuitosenCiudad(FiltroDto dto) throws Exception;
}
