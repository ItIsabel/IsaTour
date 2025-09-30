package com.catai.api.cases.city;

import com.catai.api.cases.city.model.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CityRepository extends JpaRepository<City,Long> {
    public List<City> findByPais (String pais);



}
