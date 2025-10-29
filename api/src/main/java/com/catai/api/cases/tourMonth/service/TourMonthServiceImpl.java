package com.catai.api.cases.tourMonth.service;

import com.catai.api.cases.tour.model.Tour;
import com.catai.api.cases.tourMonth.TourMonthRepository;
import com.catai.api.cases.tourMonth.model.TourMonth;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementación del servicio para la gestión de meses de operación de circuitos.
 *
 * @author Isabel Alvarez
 * @version 1.2.0
 * @since 1.2.0
 */
@Service
public class TourMonthServiceImpl implements TourMonthService {

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(TourMonthServiceImpl.class);

    @Autowired
    TourMonthRepository tourMonthRepository;

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Integer> getMesesByTourId(Long tourId) {
        return tourMonthRepository.findByTourId(tourId).stream()
            .map(tm -> tm.getMes())
            .collect(Collectors.toList());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public void updateMesesForCircuito(Tour tour, List<Integer> meses) {
        // Eliminar meses existentes
        tourMonthRepository.deleteByTourId(tour.getId());

        // Agregar nuevos meses
        if (meses != null && !meses.isEmpty()) {
            for (Integer mes : meses) {
                if (mes >= 1 && mes <= 12) {
                    // Verificar si ya existe la relación
                    boolean exists = tourMonthRepository.findByTourId(tour.getId()).stream()
                        .anyMatch(tm -> tm.getMes() == mes);
                    if (!exists) {
                        TourMonth tourMonth = new TourMonth();
                        tourMonth.setTour(tour);
                        tourMonth.setMes(mes);
                        tourMonthRepository.save(tourMonth);
                    } else {
                        log.info("Relación circuito-mes ya existe para circuito {} y mes {}, saltando", tour.getId(), mes);
                    }
                } else {
                    log.warn("Mes inválido {} para circuito {}", mes, tour.getId());
                }
            }
        }

        log.info("Meses actualizados para circuito {}: {}", tour.getId(), meses);
    }
}
