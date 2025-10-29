package com.catai.api.cases.tourOperator.model;

import jakarta.persistence.*;
import lombok.Data;

/**
 * Entidad que representa un operador turístico.
 * Esta clase mapea a la tabla "touroperador" en la base de datos y contiene
 * información sobre operadores turísticos incluyendo credenciales de acceso.
 *
 * @author Isabel Alvarez
 * @version 1.2.0
 * @since 1.2.0
 */
@Entity
@Table(name = "touroperador")
@Data
public class TourOperador {

    /**
     * Identificador único del operador turístico.
     * Se genera automáticamente utilizando la estrategia IDENTITY.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nombre del operador turístico.
     */
    @Column(name = "name")
    private String name;

    /**
     * Usuario para login.
     */
    @Column(name = "usr")
    private String usr;

    /**
     * Contraseña hasheada con BCrypt.
     */
    @Column(name = "password")
    private String password;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
