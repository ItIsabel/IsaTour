package com.catai.api.cases.tourCity;

import com.catai.api.cases.tourCity.model.TourCity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
/**
 * @author Isabel Alvarez
 * @version 1.0.1
 * @since 1.0
 */
public interface TourCityRepository extends JpaRepository<TourCity,Long> {
    @EntityGraph(attributePaths = {"city"})
    public List<TourCity> findByCityId(Long CiudadId);
    List<TourCity> findByTourIdIn(List<Long> tourIds);
}

