package com.catai.api.cases.city.model;

/**
 * DTO para la entidad Ciudad.
 * Esta clase se utiliza para transferir datos de ciudad
 * entre las capas de la aplicación.
 *
 * @author Isabel Alvarez
 * @version 1.0.1
 * @since 1.0
 */
public class CityDto {

    /**
     * Identificador único de la ciudad.
     * Se genera automáticamente utilizando la estrategia IDENTITY.
     */
    private Long id;

    /**
     * Nombre de la ciudad.
     */
    private String nombre;

    /**
     * Nombre del pais asociado a la ciudad.
     */
    private String pais;



    //GETTERS & SETTERS


    /**
     * Obtiene el identificador único de la ciudad.
     *
     * @return el identificador unico de la ciudad
     */
    public Long getId() {
        return id;
    }


    /**
     * Establece el identificador único de la ciudad.
     *
     * @param id el ID a asignar a la ciudad
     */
    public void setId(Long id) {
        this.id = id;
    }


    /**
     * Obtiene el nombre de la ciudad.
     *
     * @return el nombre de la ciudad
     */
    public String getNombre() {
        return nombre;
    }


    /**
     * Establece el nombre de la ciudad
     *
     * @param nombre el nombre a asignar a la ciudad.
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Obtiene el país asociado a la ciudad.
     *
     * @return el país.
     */
    public String getPais() {
        return pais;
    }


    /**
     * Establece el país asociado a la ciudad.
     *
     * @param pais el país.
     */
    public void setPais(String pais) {
        this.pais = pais;
    }

}
