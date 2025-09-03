package com.catai.api.cases.ciudad;

import com.catai.api.cases.ciudad.model.Ciudad;
import com.catai.api.cases.ciudad.model.CiudadDto;
import com.catai.api.cases.ciudad.service.CiudadService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */
@RequestMapping(value = "/ciudades")
@RestController
@CrossOrigin(origins = "*")
public class CiudadController {
    @Autowired
    CiudadService ciudadService;

    @Autowired
    ModelMapper mapper;

    /**
     * Método para recuperar un listado de  {@link Ciudad}
     *
     * @return list de {@link CiudadDto}
     */
    @RequestMapping(path = "", method = RequestMethod.GET)
    public List<CiudadDto> todasCiudades() {
        List<Ciudad> lista = this.ciudadService.getTodasCiudades();

        return lista.stream()
                .map(e -> mapper.map(e, CiudadDto.class))
                .sorted(Comparator.comparing(CiudadDto::getNombre))
                .collect(Collectors.toList());    }

    /**
     * Método para recuperar un listado de paises donde están las ciudades.
     *
     * @return list de Pais
     */
    @GetMapping("/paises")
    public List<String> todosPaises() {
        return this.ciudadService.getTodosPaises();
    }

}


