package com.catai.api.cases.tourOperator.model;

/**
 * DTO para la entidad TourOperador.
 * Esta clase se utiliza para transferir datos de operadores turísticos
 * entre capas de la aplicación, incluyendo información de credenciales.
 *
 * @author Isabel Alvarez
 * @version 1.2.0
 * @since 1.2.0
 */
public class TourOperadorDto {

    /**
     * Identificador único del operador turístico.
     */
    private Long id;

    /**
     * Nombre del operador turístico.
     */
    private String name;

    /**
     * Usuario para login.
     */
    private String usr;

    /**
     * Contraseña (solo para registro, no se incluye en respuestas).
     */
    private String password;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsr() {
        return usr;
    }

    public void setUsr(String usr) {
        this.usr = usr;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
