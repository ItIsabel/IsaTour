package com.catai.api.cases.ciudad.service;

import com.catai.api.cases.ciudad.CiudadRepository;
import com.catai.api.cases.ciudad.model.Ciudad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author Isabel Alvarez
 * @version 1.0
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
        return this.ciudadRepository.getCiudadporNombre(nombreCiudad);
    }


    /**
     * {@inheritDoc}
     */
    @Override
    public List<Ciudad> getTodasCiudades() {
        return this.ciudadRepository.findAll();
    }
}
