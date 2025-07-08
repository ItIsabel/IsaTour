package com.catai.api.cases.extension.model;

import com.catai.api.cases.circuito.model.Circuito;
import jakarta.persistence.*;

/**
 * Entidad que representa un una extensión de circuito.
 * Esta clase mapea a la tabla "extension" en la base de datos y contiene
 * información sobre diferentes ciudades,paises y playas con las que se
 * puede prolongar un viaje. Ver PDF EstructuraBBDD en el repositorio de github
 *
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "extension")
public class Extension {

    /**
     * Identificador único de la extension.
     * Se genera automáticamente utilizando la estrategia IDENTITY.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    /**
     * Referencia al circuito turístico que puede hacerse antes de esta extensión.
     * Se carga de forma perezosa (LAZY) para optimizar el rendimiento.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "circuito_id")
    private Circuito circuito;

    /**
     * Nombre de la extensión.
     */
    @Column(name = "nombre")
    private String nombre;





}
