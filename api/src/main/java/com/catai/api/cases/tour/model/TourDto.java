package com.catai.api.cases.tour.model;

import com.catai.api.cases.city.model.City;
import com.catai.api.cases.tourCity.model.TourCity;

import java.util.List;

/**
 * DTO para la entidad Circuito.
 * Esta clase se utiliza para transferir datos de circuitos turísticos
 * entre capas de la aplicación, incluyendo información sobre destino,
 * duración y precio.
 *
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */
public class TourDto {

    /**
     * Identificador único del circuito.
     */
    private Long id;

    /**
     * Nombre del circuito turístico.
     */
    private String nombre;


    /**
     * Duración del circuito en días.
     */
    private int dias;

    /**
     * Precio base del circuito en euros.
     */
    private float precio;

    /**
     * URL de Catai con información adicional.
     */
    private String url;

    /**
     * Touroperador asociado al circuito.
     */
    private String touroperador;




    //GETTERS & SETTERS



    /**
     * Obtiene el identificador único del circuito.
     *
     * @return el ID del circuito
     */
    public Long getId() {
        return id;
    }


    /**
     * Establece el identificador único del circuito.
     *
     * @param id el ID a asignar al circuito
     */
    public void setId(Long id) {
        this.id = id;
    }


    /**
     * Obtiene la URL con información adicional del circuito.
     *
     * @return la URL del circuito
     */
    public String getUrl() {
        return url;
    }


    /**
     * Establece la URL con información adicional del circuito.
     *
     * @param url la URL a asignar al circuito
     */
    public void setUrl(String url) {
        this.url = url;
    }


    /**
     * Obtiene el nombre del circuito.
     *
     * @return el nombre del circuito
     */
    public String getNombre() {
        return nombre;
    }


    /**
     * Establece el nombre del circuito.
     *
     * @param nombre el nombre a asignar al circuito
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }




    /**
     * Obtiene la duración del circuito en días.
     *
     * @return el número de días del circuito
     */
    public int getDias() {
        return dias;
    }


    /**
     * Establece la duración del circuito en días.
     *
     * @param dias el número de días a asignar al circuito
     */
    public void setDias(int dias) {
        this.dias = dias;
    }


    /**
     * Obtiene el precio del circuito.
     *
     * @return el precio del circuito
     */
    public float getPrecio() {
        return precio;
    }


    /**
     * Establece el precio del circuito.
     *
     * @param precio el precio a asignar al circuito
     */
    public void setPrecio(float precio) {
        this.precio = precio;
    }


    public String getTouroperador() {
        return touroperador;
    }

    public void setTouroperador(String touroperador) {
        this.touroperador = touroperador;
    }


}
