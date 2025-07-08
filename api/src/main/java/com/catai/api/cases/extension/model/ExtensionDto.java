package com.catai.api.cases.extension.model;

import com.catai.api.cases.circuito.model.CircuitoDto;

/**
 * DTO para la entidad Extension.
 * Esta clase se utiliza para transferir datos de extension
 * entre las capas de la aplicación.
 *
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */
public class ExtensionDto {

    /**
     * Identificador único de la extensión.
     */

    private long id;

    /**
     * Referencia al circuito turístico que puede hacerse antes de esta extensión.
     */
    private CircuitoDto circuito;

    /**
     * Nombre de la extensión.
     */
    private String nombre;



    //GETTERS & SETTERS


    /**
     * Obtiene el identificador único de la extensión.
     *
     * @return el identificador unico de la extensión
     */
    public long getId() {
        return id;
    }


    /**
     * Establece el identificador único de la extensión.
     *
     * @param id el ID a asignar a la extensión
     */
    public void setId(long id) {
        this.id = id;
    }


    /**
     * Obtiene el circuito asociado a la extensión.
     *
     * @return el circuito asociado a la extensión
     */
    public CircuitoDto getCircuito() {
        return circuito;
    }


    /**
     * Establece el circuito asociado a la extensión.
     *
     * @param circuito el circuito asociado a la extensión
     */
    public void setCircuito(CircuitoDto circuito) {
        this.circuito = circuito;
    }


    /**
     * Obtiene el nombre de la extensión.
     *
     * @return el nombre de la extensión
     */
    public String getNombre() {
        return nombre;
    }


    /**
     * Establece el nombre de la extensión
     *
     * @param nombre el nombre a asignar a la extensión.
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
