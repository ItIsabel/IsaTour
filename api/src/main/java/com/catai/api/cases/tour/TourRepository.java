package com.catai.api.cases.tour;

import com.catai.api.cases.tour.model.Tour;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TourRepository extends JpaRepository<Tour,Long> {

    /**
     * Busca circuitos por tour operador
     * @param touroperador nombre del tour operador
     * @return lista de circuitos del tour operador
     */
    List<Tour> findByTouroperador(String touroperador);
}
