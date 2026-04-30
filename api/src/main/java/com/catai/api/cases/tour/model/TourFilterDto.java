package com.catai.api.cases.tour.model;

public class TourFilterDto {
    private Long idCiudad;
    private Long idCircuito;
    private String nombrePais;
    private Integer dias;
    private String touroperador;
    private Integer page = 0;
    private Integer size = 20;



    //GETTERS & SETTERS

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }


    public String getNombrePais() {
        return nombrePais;
    }

    public void setNombrePais(String pais) {
        this.nombrePais = pais;
    }

    public Integer getDias() {
        return dias;
    }

    public void setDias(Integer dias) {
        this.dias = dias;
    }

    public String getTouroperador() {
        return touroperador;
    }

    public void setTouroperador(String touroperador) {
        this.touroperador = touroperador;
    }

    public Long getIdCiudad() {
        return idCiudad;
    }
    public void setIdCiudad(Long idCiudad) {
        this.idCiudad = idCiudad;
    }

    public Long getIdCircuito() {
        return idCircuito;
    }

    public void setIdCircuito(Long idCircuito) {
        this.idCircuito = idCircuito;
    }
}
