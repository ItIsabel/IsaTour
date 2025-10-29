package com.catai.api.cases.tourOperator.service;

import com.catai.api.cases.tourOperator.model.TourOperador;
import com.catai.api.cases.tourOperator.model.TourOperadorDto;

import java.util.Optional;

/**
 * Servicio para la gestión de operadores turísticos.
 *
 * @author Isabel Alvarez
 * @version 1.2.0
 * @since 1.2.0
 */
public interface TourOperadorService {

    /**
     * Busca un operador turístico por su nombre de usuario.
     *
     * @param usr el nombre de usuario
     * @return Optional con el TourOperador si existe
     */
    Optional<TourOperador> findByUsr(String usr);

    /**
     * Autentica un operador turístico con usuario y contraseña.
     *
     * @param usr el nombre de usuario
     * @param password la contraseña en texto plano
     * @return Optional con el TourOperador si la autenticación es exitosa
     */
    Optional<TourOperador> authenticate(String usr, String password);

    /**
     * Registra un nuevo operador turístico con contraseña hasheada.
     *
     * @param tourOperadorDto los datos del operador turístico
     * @return el TourOperador creado
     */
    TourOperador register(TourOperadorDto tourOperadorDto);
}
