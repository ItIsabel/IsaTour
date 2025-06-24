package com.catai.api.cases.ciudad;

import com.catai.api.cases.ciudad.model.Ciudad;
import com.catai.api.cases.ciudad.model.CiudadDto;
import com.catai.api.cases.ciudad.service.CiudadService;
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
    @RequestMapping(path = "", method = RequestMethod.POST)
    public List<CiudadDto> TodasCiudades() {
        List<Ciudad> lista = this.ciudadService.getTodasCiudades();

        return lista.stream().map(e -> mapper.map(e, CiudadDto.class)).collect(Collectors.toList());
    }
}

