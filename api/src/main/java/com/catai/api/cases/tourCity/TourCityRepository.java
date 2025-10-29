package com.catai.api.cases.tourCity;

import com.catai.api.cases.tourCity.model.TourCity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
/**
 * @author Isabel Alvarez
 * @version 1.2.0
 * @since 1.0
 */
public interface TourCityRepository extends JpaRepository<TourCity,Long> {
    @EntityGraph(attributePaths = {"city"})
    public List<TourCity> findByCityId(Long CiudadId);
    List<TourCity> findByTourIdIn(List<Long> tourIds);

    @EntityGraph(attributePaths = {"city","tour"})
    List<TourCity> findByTourId(@Param("tourId") Long tourId);

    void deleteByTourId(Long tourId);
}

