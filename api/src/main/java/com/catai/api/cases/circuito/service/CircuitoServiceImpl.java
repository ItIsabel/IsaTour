package com.catai.api.cases.circuito.service;

import com.catai.api.cases.circuito.CircuitoRepository;
import com.catai.api.cases.circuito.model.Circuito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CircuitoServiceImpl implements CircuitoService{
    @Autowired
    CircuitoRepository circuitoRepository;

    @Override
    public List<Circuito> getTodosLosCircuitos() {
        return this.circuitoRepository.findAll();
    }

    @Override
    public List<Circuito> getCircuitosFiltrados(Integer dias, String touroperador) {
        if (dias != null && touroperador != null && !touroperador.isEmpty()) {
            return circuitoRepository.findByDiasAndTouroperador(dias, touroperador);
        } else if (dias != null) {
            return circuitoRepository.findByDias(dias);
        } else if (touroperador != null && !touroperador.isEmpty()) {
            return circuitoRepository.findByTouroperador(touroperador);
        } else {
            return circuitoRepository.findAll();
        }
    }
}
