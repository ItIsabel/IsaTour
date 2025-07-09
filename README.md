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
- Group: com.catai
- ArtifactId: api
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
### Frontend
#### Diseño del front con Penpot:
https://design.penpot.app/#/view?file-id=518f9b2f-adb9-81b5-8006-75bb3fd7401d&page-id=518f9b2f-adb9-81b5-8006-75bb3fd7401e&section=interactions&index=0&share-id=dfec20eb-20e2-80c9-8006-75ce7cb8fe36
