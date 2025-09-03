package com.catai.api.cases.circuito;

import com.catai.api.cases.circuito.model.Circuito;
import com.catai.api.cases.circuito.model.CircuitoDto;
import com.catai.api.cases.circuito.service.CircuitoService;
import com.catai.api.cases.circuitoCiudad.model.FiltroDto;
import com.catai.api.cases.ciudad.model.Ciudad;
import com.catai.api.cases.ciudad.model.CiudadDto;
import com.catai.api.cases.extension.model.ExtensionDto;
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
@RequestMapping(value = "/circuitos")
@RestController
@CrossOrigin(origins = "*")
public class CircuitoController {
    @Autowired
    CircuitoService circuitoService;

    @Autowired
    ModelMapper mapper;

    /**
     * Método para recuperar un listado de  {@link Circuito}
     *
     * @return list de {@link CircuitoDto}
     */
    @RequestMapping(path = "", method = RequestMethod.GET)
    public List<CircuitoDto> todosCircuitos(
            @RequestParam(required = false) Integer dias,
            @RequestParam(required = false) String touroperador) {

        List<Circuito> lista = this.circuitoService.getCircuitosFiltrados(dias, touroperador);

        return lista.stream().map(e -> mapper.map(e, CircuitoDto.class)).collect(Collectors.toList());
    }

}
