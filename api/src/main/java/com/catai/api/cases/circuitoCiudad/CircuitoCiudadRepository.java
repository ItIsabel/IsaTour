package com.catai.api.cases.circuitoCiudad;

import com.catai.api.cases.circuitoCiudad.model.CircuitoCiudad;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
/**
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */
public interface CircuitoCiudadRepository extends JpaRepository<CircuitoCiudad,Long> {
    @EntityGraph(attributePaths = {"ciudad"})
    public List<CircuitoCiudad> findByCiudadId(Long CiudadId);
}
