package com.catai.api.ciudad;

import com.catai.api.ciudad.model.Ciudad;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CiudadRepository extends JpaRepository<Ciudad,Long> {
    public Ciudad getCiudadByNombre(String nombre);
}
