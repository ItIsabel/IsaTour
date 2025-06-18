# APICatai
demo de API para TTOO. De momento solo backend sin terminar...
## Notas de Implementación Técnica:
### Backend
- Framework Spring Boot
- Java 17 o superior
- Base de datos Mysql (yo he usado Workbench)
- Arquitectura API RESTful

## Configuración del Entorno de Desarrollo

### Requisitos Backend
- IDE IntelliJ
- Java 17 o superior
- Postman para pruebas de API

### Configuración de Spring
- Tipo de proyecto: Maven
- Lenguaje: Java
- Versión de Spring Boot: 3.2.4 (o similar versión 3.x no-SNAPSHOT)
- Group: com.ccsw
- ArtifactId: tutorial
- Versión de Java: 17 o superior

### Dependencias Backend
- Spring Web
- Spring Data JPA
- Base de datos MySql
- Dependencias adicionales:
  ```xml
  <dependency>
      <groupId>org.springdoc</groupId> 
      <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
      <version>2.0.3</version>
  </dependency>
  <dependency>
      <groupId>org.hibernate</groupId>  
      <artifactId>hibernate-validator</artifactId>
      <version>8.0.0.Final</version>
  </dependency>
  <dependency>
      <groupId>org.modelmapper</groupId>
      <artifactId>modelmapper</artifactId>
      <version>3.1.1</version>
  </dependency>
  ```


