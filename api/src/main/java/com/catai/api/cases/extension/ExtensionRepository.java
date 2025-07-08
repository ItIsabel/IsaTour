package com.catai.api.cases.extension;

import com.catai.api.cases.extension.model.Extension;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */
public interface ExtensionRepository extends JpaRepository<Extension, Long> {
    @EntityGraph(attributePaths = {"circuito"})
    public List<Extension> findByCircuito();
}
