package com.catai.api.cases.city.service.country;

import com.catai.api.cases.tour.model.TourFilterDto;
import java.util.List;

/**
 * Servicio para operaciones de búsqueda complejas que involucran múltiples entidades
 * (Tours, Cities, Countries) y evitar dependencias circulares
 */
public interface CountrySearchService {

    /**
     * Encuentra países que tienen tours disponibles según los filtros aplicados
     * @param filtro filtros para la búsqueda de tours
     * @return lista de nombres de países que cumplen los criterios
     */
    List<String> findCountriesWithTourFilters(TourFilterDto filtro);


}