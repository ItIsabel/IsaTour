package com.catai.api.cases.tourOperator.service;

import com.catai.api.cases.tourOperator.TourOperadorRepository;
import com.catai.api.cases.tourOperator.model.TourOperador;
import com.catai.api.cases.tourOperator.model.TourOperadorDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class TourOperadorServiceImpl implements TourOperadorService {

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(TourOperadorServiceImpl.class);

    @Autowired
    private TourOperadorRepository tourOperadorRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public Optional<TourOperador> findByUsr(String usr) {
        return tourOperadorRepository.findByUsr(usr);
    }

    @Override
    public Optional<TourOperador> authenticate(String usr, String password) {
        Optional<TourOperador> tourOperadorOpt = tourOperadorRepository.findByUsr(usr);
        if (tourOperadorOpt.isPresent()) {
            TourOperador tourOperador = tourOperadorOpt.get();
            if (passwordEncoder.matches(password, tourOperador.getPassword())) {
                log.info("Autenticación exitosa para usuario: {}", usr);
                return Optional.of(tourOperador);
            } else {
                log.warn("Contraseña incorrecta para usuario: {}", usr);
            }
        } else {
            log.warn("Usuario no encontrado: {}", usr);
        }
        return Optional.empty();
    }

    @Override
    public TourOperador register(TourOperadorDto tourOperadorDto) {
        TourOperador tourOperador = new TourOperador();
        tourOperador.setName(tourOperadorDto.getName());
        tourOperador.setUsr(tourOperadorDto.getUsr());
        tourOperador.setPassword(passwordEncoder.encode(tourOperadorDto.getPassword()));
        return tourOperadorRepository.save(tourOperador);
    }
}
