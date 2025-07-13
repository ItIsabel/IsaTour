package com.catai.api.cases.circuito;

import com.catai.api.cases.circuito.model.Circuito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CircuitoRepository extends JpaRepository<Circuito,Long> {
    List<Circuito> findByDiasAndTouroperador(int dias, String touroperador);
    List<Circuito> findByDias(int dias);
    List<Circuito> findByTouroperador(String touroperador);
}
