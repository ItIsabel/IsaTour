package com.catai.api.cases.circuitoCiudad;

import com.catai.api.cases.circuitoCiudad.model.CircuitoCiudad;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CircuitoCiudadRepository extends JpaRepository<CircuitoCiudad,Long> {
    @EntityGraph(attributePaths = {"ciudad"})
    public List<CircuitoCiudad> findByCiudadId(Long CiudadId);
}
