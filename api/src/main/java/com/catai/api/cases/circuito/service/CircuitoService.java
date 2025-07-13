package com.catai.api.cases.circuito.service;

import com.catai.api.cases.circuito.model.Circuito;
import com.catai.api.cases.ciudad.model.Ciudad;

import java.util.List;

public interface CircuitoService {
    /**
     * Devuelve todos los {@link Circuito} de Catai.
     *
     * @return Un List de {@link  Circuito} .
     */
    public List<Circuito> getTodosLosCircuitos();

    /**
     * Devuelve circuitos filtrados por dias y touroperador.
     *
     * @param dias Duración en días para filtrar.
     * @param touroperador Nombre del touroperador para filtrar.
     * @return Un List de {@link Circuito} filtrados.
     */
    public List<Circuito> getCircuitosFiltrados(Integer dias, String touroperador);
}
