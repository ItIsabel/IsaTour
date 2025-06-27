package com.catai.api.cases.circuito;

import com.catai.api.cases.circuito.model.Circuito;
import com.catai.api.cases.circuito.model.CircuitoDto;
import com.catai.api.cases.circuito.service.CircuitoService;
import com.catai.api.cases.ciudad.model.Ciudad;
import com.catai.api.cases.ciudad.model.CiudadDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;
/**
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */
@RequestMapping(value = "/circuitos")
@RestController
@CrossOrigin(origins = "*")
public class CircuitoController {
    @Autowired
    CircuitoService circuitoService;

    @Autowired
    ModelMapper mapper;

    /**
     * Método para recuperar un listado de  {@link Ciudad}
     *
     * @return list de {@link CircuitoDto}
     */
    @RequestMapping(path = "", method = RequestMethod.GET)
    public List<CircuitoDto> TodasCiudades() {
        List<Circuito> lista = this.circuitoService.getTodosLosCircuitos();

        return lista.stream().map(e -> mapper.map(e, CircuitoDto.class)).collect(Collectors.toList());
    }
}
