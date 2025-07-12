package com.catai.api.cases.extension;

import com.catai.api.cases.circuito.model.Circuito;
import com.catai.api.cases.circuito.model.CircuitoDto;
import com.catai.api.cases.circuito.service.CircuitoService;
import com.catai.api.cases.circuitoCiudad.model.FiltroDto;
import com.catai.api.cases.extension.model.Extension;
import com.catai.api.cases.extension.model.ExtensionDto;
import com.catai.api.cases.extension.service.ExtensionService;
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
@RequestMapping(value = "/extensiones")
@RestController
@CrossOrigin(origins = "*")
public class ExtensionController {

    @Autowired
    ExtensionService extensionService;

    @Autowired
    ModelMapper mapper;

    /**
     * Método para recuperar un listado de  {@link Extension} de un circuito
     *
     * @return list de {@link CircuitoDto}
     */
    @RequestMapping(path = {"","/{id}"}, method = {RequestMethod.POST})
    public List<ExtensionDto> extensionesDeCircuito(
        @PathVariable("id") long circuitoId) {
        List<Extension> lista = this.extensionService.getExtensionesByCircuitoId(circuitoId);

        return lista.stream().map(e -> mapper.map(e, ExtensionDto.class)).collect(Collectors.toList());
    }
}
