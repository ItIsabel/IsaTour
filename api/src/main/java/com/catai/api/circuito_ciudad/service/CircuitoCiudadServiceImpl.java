package com.catai.api.circuito_ciudad.service;

import com.catai.api.circuito_ciudad.CircuitoCiudadRepository;
import com.catai.api.circuito_ciudad.model.CircuitoCiudad;
import com.catai.api.circuito_ciudad.model.FiltroDto;
import com.catai.api.ciudad.model.Ciudad;
import com.catai.api.ciudad.service.CiudadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


/**
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */
@Service
public class CircuitoCiudadServiceImpl implements CircuitoCiudadService {

    @Autowired
    CiudadService ciudadService;

    @Autowired
    CircuitoCiudadRepository circuitoCiudadRepository;

//podemos añadir un metodo que valide si la ciudad existe o no. Mirar el autocompletar del front...?

    @Override
    public List<CircuitoCiudad> encuentraCircuitosenCiudad(FiltroDto dto) {
        Ciudad ciudad= this.ciudadService.getCiudadporNombre(dto.getCiudad().getNombre());
//aqui tenemos que llamar al circuitoCitudadRepository.getCircuitosbyIdCiudad(ciudad.getId) o algo asi.


        return new ArrayList<>();
    }
}
