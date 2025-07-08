package com.catai.api.cases.circuitoCiudad.model;

public class FiltroDto {
    private String nombreCiudad;
    private long idCircuito;

    public String getNombreCiudad() {
        return nombreCiudad;
    }

    public void setNombreCiudad(String nombreCiudad) {
        this.nombreCiudad = nombreCiudad;
    }

    public long getIdCircuito() {
        return idCircuito;
    }

    public void setIdCircuito(long idCircuito) {
        this.idCircuito = idCircuito;
    }
}
