package com.catai.api.circuito_ciudad.model;

import com.catai.api.ciudad.model.Ciudad;

public class FiltroDto {
    private Ciudad ciudad;

    public Ciudad getCiudad() {
        return ciudad;
    }

    public void setCiudad(Ciudad ciudad) {
        this.ciudad = ciudad;
    }
}
