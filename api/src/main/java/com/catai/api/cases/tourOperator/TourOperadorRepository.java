package com.catai.api.cases.tourOperator;

import com.catai.api.cases.tourOperator.model.TourOperador;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TourOperadorRepository extends JpaRepository<TourOperador, Long> {

    /**
     * Busca un operador turístico por su nombre de usuario.
     *
     * @param usr el nombre de usuario
     * @return Optional con el TourOperador si existe
     */
    Optional<TourOperador> findByUsr(String usr);
}
