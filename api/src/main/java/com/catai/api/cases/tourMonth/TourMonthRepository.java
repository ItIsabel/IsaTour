package com.catai.api.cases.tourMonth;

import com.catai.api.cases.tourMonth.model.TourMonth;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio para la entidad TourMonth.
 *
 * @author Isabel Alvarez
 * @version 1.2.0
 * @since 1.2.0
 */
@Repository
public interface TourMonthRepository extends JpaRepository<TourMonth, Long> {

    /**
     * Busca los meses de operación de un circuito específico.
     *
     * @param tourId el ID del circuito
     * @return lista de meses del circuito
     */
    @EntityGraph(attributePaths = {"tour"})
    List<TourMonth> findByTourId(Long tourId);

    /**
     * Elimina todas las relaciones de meses para un circuito específico.
     *
     * @param tourId el ID del circuito
     */
    void deleteByTourId(Long tourId);
}
