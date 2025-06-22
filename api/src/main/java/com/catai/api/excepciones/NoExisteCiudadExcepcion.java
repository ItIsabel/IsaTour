package com.catai.api.excepciones;

public class NoExisteCiudadExcepcion extends RuntimeException {
    public NoExisteCiudadExcepcion() {
    }
    public NoExisteCiudadExcepcion(String message) {
        super(message);
    }

}
