package com.catai.api.circuito_ciudad;

import com.catai.api.circuito.model.Circuito;
import com.catai.api.circuito.model.CircuitoDto;
import com.catai.api.circuito.service.CircuitoService;
import com.catai.api.circuito_ciudad.model.CircuitoCiudad;
import com.catai.api.circuito_ciudad.model.CircuitoCiudadDto;
import com.catai.api.circuito_ciudad.model.FiltroDto;
import com.catai.api.circuito_ciudad.service.CircuitoCiudadService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */
@RequestMapping(value = "/buscar")
@RestController
@CrossOrigin(origins = "*")
public class CircuitoCiudadController {
    @Autowired
    CircuitoCiudadService circuitoCiudadService;

    @Autowired
    ModelMapper mapper;

    /**
     * Método para recuperar un listado de circuitos {@link Circuito}
     *
     * @param dto dto de búsqueda
     * @return list de {@link CircuitoDto}
     */
    @RequestMapping(path = "", method = RequestMethod.POST)
    public List<CircuitoCiudadDto> encuentraCircuitosenCiudad(@RequestBody FiltroDto dto) {
        List<CircuitoCiudad> lista = this.circuitoCiudadService.encuentraCircuitosenCiudad(dto);

        return lista.stream().map(e -> mapper.map(e, CircuitoCiudadDto.class)).collect(Collectors.toList());
    }
}