package com.catai.api.cases.ciudad;

import com.catai.api.cases.ciudad.model.Ciudad;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CiudadRepository extends JpaRepository<Ciudad,Long> {
    public Ciudad findByNombre(String nombre);
}
