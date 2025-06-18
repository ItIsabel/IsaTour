package com.catai.api.ciudad.service;

import com.catai.api.ciudad.CiudadRepository;
import com.catai.api.ciudad.model.Ciudad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public Ciudad getCiudad(String nombreCiudad) {
        return this.ciudadRepository.getCiudadByNombre(nombreCiudad);
    }
}
