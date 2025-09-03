package com.catai.api.cases.ciudad.service;

import com.catai.api.cases.ciudad.CiudadRepository;
import com.catai.api.cases.ciudad.model.Ciudad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Isabel Alvarez
 * @version 1.0.1
 * @since 1.0
 */

@Service
@Transactional
public class CiudadServiceImpl implements CiudadService{

    @Autowired
    CiudadRepository ciudadRepository;

    /**
     * {@inheritDoc}
     */
    @Override
    public Ciudad getCiudadporNombre(String nombreCiudad) {
        return this.ciudadRepository.findByNombre(nombreCiudad);
    }


    /**
     * {@inheritDoc}
     */
    @Override
    public List<Ciudad> getTodasCiudades() {
        return this.ciudadRepository.findAll();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Ciudad> getCiudadesPorPais (String pais){
        return this.ciudadRepository.findByPais(pais);
    }

    /**
     * {@inheritDoc}
     */
    public List<String> getTodosPaises(){
        List<Ciudad> listaCiudades = this.ciudadRepository.findAll();
        return listaCiudades.stream()
                .map(Ciudad::getPais)
                .distinct()
                .collect(Collectors.toList());
    }
}
