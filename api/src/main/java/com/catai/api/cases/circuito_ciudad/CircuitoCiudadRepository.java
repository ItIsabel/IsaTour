package com.catai.api.cases.circuito_ciudad;

import com.catai.api.cases.circuito_ciudad.model.CircuitoCiudad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CircuitoCiudadRepository extends JpaRepository<CircuitoCiudad,Long> {
    public List<CircuitoCiudad> getCircuitosbyIdCiudad (Long idCiudad);
}
