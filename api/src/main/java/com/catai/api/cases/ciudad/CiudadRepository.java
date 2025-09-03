package com.catai.api.cases.ciudad;

import com.catai.api.cases.ciudad.model.Ciudad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CiudadRepository extends JpaRepository<Ciudad,Long> {
    public Ciudad findByNombre(String nombre);
    public List<Ciudad> findByPais (String pais);
    List<Ciudad> findDistinctPaisBy();


}
