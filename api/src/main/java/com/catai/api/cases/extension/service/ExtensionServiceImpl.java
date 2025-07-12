package com.catai.api.cases.extension.service;

import com.catai.api.cases.extension.ExtensionRepository;
import com.catai.api.cases.extension.model.Extension;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
/**
 * @author Isabel Alvarez
 * @version 1.0
 * @since 1.0
 */

@Slf4j
@Service
public class ExtensionServiceImpl implements ExtensionService{
    @Autowired
    private ExtensionRepository extensionRepository;

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Extension> getExtensionesByCircuitoId(Long circuitoID) {
        return this.extensionRepository.findByCircuitoId(circuitoID);
    }
}
