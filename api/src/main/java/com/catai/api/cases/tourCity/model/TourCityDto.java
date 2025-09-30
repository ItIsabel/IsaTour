package com.catai.api.cases.tourCity.model;

import com.catai.api.cases.tour.model.TourDto;
import com.catai.api.cases.city.model.CityDto;

/**
 * DTO  que representa la relación entre un circuito turístico y las ciudades
 * por las que pasa. Esta clase se utiliza para transferir datos de la relación
 * Many2Many "circuito_ciudad", sin exponer la entidad completa.
 *
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */
public class TourCityDto {
    private Long id;
    private TourDto tourDto;
    private CityDto cityDto;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TourDto getTourDto() {
        return tourDto;
    }

    public void setTourDto(TourDto tourDto) {
        this.tourDto = tourDto;
    }

    public CityDto getCityDto() {
        return cityDto;
    }

    public void setCityDto(CityDto cityDto) {
        this.cityDto = cityDto;
    }
}
