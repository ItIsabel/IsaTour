package com.catai.api.common;

public class ErrorDto {
    private String codigo;
    private String mensaje;



    //GETTERS & SETTERS


    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}