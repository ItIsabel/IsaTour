package com.catai.api.cases.tourMonth;

import com.catai.api.cases.tour.service.TourService;
import com.catai.api.cases.tourMonth.service.TourMonthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for managing tour months.
 *
 * @author Isabel Alvarez
 * @version 1.2.0
 * @since 1.2.0
 */
@RequestMapping("/meses")
@RestController
@CrossOrigin(origins = "*")
@Slf4j
public class TourMonthController {

    @Autowired
    TourMonthService tourMonthService;

    @Autowired
    TourService tourService;

    /**
     * Get months for a specific tour.
     *
     * @param tourId the tour ID
     * @return list of month numbers (1-12)
     */
    @GetMapping("/{tourId}/meses")
    public ResponseEntity<List<Integer>> getMesesByTour(@PathVariable Long tourId) {
        try {
            List<Integer> meses = tourMonthService.getMesesByTourId(tourId);
            return ResponseEntity.ok(meses);
        } catch (Exception e) {
            log.error("Error getting months for tour {}: {}", tourId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
