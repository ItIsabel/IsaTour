package com.catai.api.cases.extension.service;

import com.catai.api.cases.circuito.model.Circuito;
import com.catai.api.cases.extension.model.Extension;

import java.util.List;
/**
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */

public interface ExtensionService {
    /**
     * Devuelve todos los {@link Extension} de un circuito.
     *
     * @return Un List de {@link  Extension} .
     */
    public List<Extension> getExtensionesByCircuito(Long circuitoID);
}
