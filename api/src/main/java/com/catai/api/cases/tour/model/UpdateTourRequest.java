package com.catai.api.cases.tour.model;

import java.util.List;

/**
 * Request DTO for updating an existing tour.
 * Contains the tour data and associated cities and months.
 *
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */
public class UpdateTourRequest {

    private TourDto tour;
    private List<Long> ciudades;
    private List<Integer> meses;

    // Getters and Setters

    public TourDto getTour() {
        return tour;
    }

    public void setTour(TourDto tour) {
        this.tour = tour;
    }

    public List<Long> getCiudades() {
        return ciudades;
    }

    public void setCiudades(List<Long> ciudades) {
        this.ciudades = ciudades;
    }

    public List<Integer> getMeses() {
        return meses;
    }

    public void setMeses(List<Integer> meses) {
        this.meses = meses;
    }
}
