package com.catai.api.cases.tourMonth.model;

/**
 * DTO que representa la relación entre un circuito turístico y los meses de operación.
 * Esta clase se utiliza para transferir datos de la relación "circuito_mes",
 * sin exponer la entidad completa.
 *
 * @author Isabel Alvarez
 * @version 1.2.0
 * @since 1.2.0
 */
public class TourMonthDto {
    private Long id;
    private Long circuitoId;
    private int mes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCircuitoId() {
        return circuitoId;
    }

    public void setCircuitoId(Long circuitoId) {
        this.circuitoId = circuitoId;
    }

    public int getMes() {
        return mes;
    }

    public void setMes(int mes) {
        this.mes = mes;
    }
}
