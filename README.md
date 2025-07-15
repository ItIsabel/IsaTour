Este documento detalla una API REST para la gestión de circuitos turísticos, ciudades y extensiones de viaje, junto con la arquitectura y funcionalidades de su frontend.

## 🚀 Características Principales

  * [cite\_start]**Gestión de Circuitos**: Permite la visualización, filtrado y ordenación de circuitos turísticos[cite: 3].
  * [cite\_start]**Exploración de Ciudades**: Facilita la búsqueda y exploración de ciudades con circuitos disponibles[cite: 4].
  * [cite\_start]**Filtros Avanzados**: Ofrece opciones de filtrado por país, duración y touroperador[cite: 5].
  * [cite\_start]**Interfaz Responsive**: Cuenta con un diseño adaptativo para dispositivos móviles y de escritorio[cite: 6].
  * [cite\_start]**Modo Oscuro**: Permite la alternancia entre un tema claro y uno oscuro[cite: 7].
  * [cite\_start]**Arquitectura Modular**: Desarrollada con componentes reutilizables utilizando Lit Element[cite: 8].

## Equipo de Desarrollo

  * [cite\_start]**Backend**: Desarrollado con Spring Boot, JPA y MySQL[cite: 10].
  * [cite\_start]**Frontend**: Implementado con Lit Element, CSS3 y JavaScript ES6+[cite: 11].
  * [cite\_start]**Diseño**: Interfaz moderna y responsive[cite: 12].

## BACKEND

[cite\_start]La API está construida con Spring Boot y sigue una arquitectura por capas[cite: 14]:

  * [cite\_start]**Controllers**: Capa de presentación que maneja las peticiones HTTP[cite: 15].
  * [cite\_start]**Services**: Capa de lógica de negocio[cite: 16].
  * [cite\_start]**Repositories**: Capa de acceso a datos usando Spring Data JPA[cite: 17].
  * [cite\_start]**Models**: Entidades JPA y DTOs para transferencia de datos[cite: 18].

### Endpoints Disponibles

#### 🗺️ Circuitos

[cite\_start]`GET /circuitos` [cite: 21]

[cite\_start]Obtiene todos los circuitos disponibles con filtros opcionales[cite: 22].

**Parámetros de consulta**:

  * [cite\_start]`dias` (opcional): Filtra por duración en días[cite: 24].
  * [cite\_start]`touroperador` (opcional): Filtra por nombre del touroperador[cite: 25].

**Respuesta**:

```json
[
  {
    "id": 1,
    "nombre": "Circuito Andalucía",
    "pais": "España",
    "dias": 7,
    "precio": 850.0,
    "url": "https://catai.es/circuito-andalucia",
    "touroperador": "Catai"
  }
]
```

[cite\_start][cite: 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38]

**Ejemplos de uso**:

```bash
# Todos los circuitos
GET /circuitos

# Circuitos de 7 días
GET /circuitos?dias=7

# Circuitos de un touroperador específico
GET /circuitos?touroperador=Catai

# Circuitos de 7 días de un touroperador específico
GET /circuitos?dias=7&touroperador=Catai
```

[cite\_start][cite: 40, 41, 42, 43, 44, 45, 46, 47, 48]

#### 🏙️ Ciudades

[cite\_start]`GET /ciudades` [cite: 50]

[cite\_start]Obtiene todas las ciudades disponibles en los circuitos[cite: 51].

**Respuesta**:

```json
[
  {
    "id": 1,
    "nombre": "Madrid"
  },
  {
    "id": 2,
    "nombre": "Barcelona"
  }
]
```

[cite\_start][cite: 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63]

#### 🔍 Búsqueda de Circuitos por Ciudad

[cite\_start]`POST /buscar` [cite: 65]

[cite\_start]Busca circuitos que incluyan una ciudad específica[cite: 66].

**Cuerpo de la petición**:

```json
{
  "nombreCiudad": "Madrid"
}
```

[cite\_start][cite: 68, 69, 70, 71]

**Respuesta**:

```json
[
  {
    "id": 1,
    "circuito": {
      "id": 1,
      "nombre": "Circuito España Imperial",
      "pais": "España",
      "dias": 8,
      "precio": 950.0,
      "url": "https://catai.es/circuito-espana-imperial",
      "touroperador": "Catai"
    },
    "ciudad": {
      "id": 1,
      "nombre": "Madrid"
    }
  }
]
```

[cite\_start][cite: 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91]

**Códigos de respuesta**:

  * [cite\_start]`200 OK`: Búsqueda exitosa[cite: 93].
  * [cite\_start]`400 Bad Request`: Parámetros inválidos[cite: 94].
  * [cite\_start]`500 Internal Server Error`: Error interno del servidor[cite: 95].

#### 🌴 Extensiones

[cite\_start]`POST /extensiones/{id}` [cite: 97]

[cite\_start]Obtiene las extensiones disponibles para un circuito específico[cite: 98].

**Parámetros de ruta**:

  * [cite\_start]`id`: ID del circuito[cite: 100].

**Respuesta**:

```json
[
  {
    "id": 1,
    "nombre": "Extensión Islas Baleares",
    "circuito": {
      "id": 1,
      "nombre": "Circuito España Imperial",
      "pais": "España",
      "dias": 8,
      "precio": 950.0,
      "url": "https://catai.es/circuito-espana-imperial",
      "touroperador": "Catai"
    }
  }
]
```

[cite\_start][cite: 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117]

**Ejemplo de uso**:

```bash
POST /extensiones/1
```

[cite\_start][cite: 119, 120]

### Modelo de Datos

#### Circuito

```java
{
  "id": Long,
  "nombre": String,
  "pais": String,
  "dias": int,
  "precio": float,
  "url": String,
  "touroperador": String
}
```

[cite\_start][cite: 123, 124, 125, 126, 127, 128, 129, 130, 131, 132]

#### Ciudad

```java
{
  "id": Long,
  "nombre": String
}
```

[cite\_start][cite: 134, 135, 136, 137, 138]

#### Extension

```java
{
  "id": long,
  "nombre": String,
  "circuito": CircuitoDto
}
```

[cite\_start][cite: 140, 141, 142, 143, 144, 145]

#### FiltroDto (para búsquedas)

```java
{
  "nombreCiudad": String,
  "idCircuito": long
}
```

[cite\_start][cite: 147, 148, 149, 150, 151]

### Relaciones entre Entidades

  * [cite\_start]**Circuito ↔ Ciudad**: Relación Many-to-Many a través de la tabla `circuito_ciudad`[cite: 153].
  * [cite\_start]**Circuito ↔ Extension**: Relación One-to-Many (un circuito puede tener múltiples extensiones)[cite: 154].

## FRONTEND:

### 📁 Estructura del Proyecto

```
cliente/
├── src/
│   ├── app.js                          # Componente principal de la aplicación
│   ├── header/                         # Módulo de header/navegación
│   │   ├── app-header.js              # Componente de header
│   │   └── app-header-styles.js       # Estilos del header
│   ├── circuito/                       # Módulo de circuitos
│   │   ├── circuito-lista.js          # Componente lista de circuitos
│   │   ├── circuito-lista-styles.js   # Estilos de circuitos
│   │   └── circuitoService.js         # Servicio API circuitos
│   └── ciudad/                         # Módulo de ciudades
│       ├── ciudad-lista.js            # Componente lista de ciudades
│       ├── ciudad-lista-styles.js     # Estilos de ciudades
│       └── ciudadService.js           # Servicio API ciudades
├── index.html                          # Punto de entrada
└── style.css                          # Estilos globales
```

[cite\_start][cite: 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172]

### 🎨 Arquitectura de Componentes

  * [cite\_start]**Componente Principal (MyApp)** [cite: 174]
      * [cite\_start]**Responsabilidad**: Gestión de rutas y vistas principales[cite: 175].
      * [cite\_start]**Estado**: `currentView` para controlar la vista activa[cite: 176].
      * [cite\_start]**Eventos**: Escucha eventos de navegación del header[cite: 177].
  * [cite\_start]**Header (AppHeader)** [cite: 178]
      * [cite\_start]**Responsabilidad**: Navegación entre secciones y toggle de modo oscuro[cite: 179].
      * [cite\_start]**Props**: `currentPage` para indicar la página activa[cite: 180].
      * [cite\_start]**Eventos**: Emite `page-change` para cambios de navegación[cite: 181].
  * [cite\_start]**Lista de Circuitos (PageCircuits)** [cite: 182]
      * [cite\_start]**Responsabilidad**: Visualización y filtrado de circuitos[cite: 183].
      * [cite\_start]**Estado**: `circuitos`, `loading`, `error`, `filtros` y `ordenación`[cite: 184].
      * **Funcionalidades**:
          * [cite\_start]Filtrado por país, días y touroperador[cite: 186].
          * [cite\_start]Ordenación por precio y duración[cite: 187].
          * [cite\_start]Carga de extensiones (popup modal)[cite: 188].
  * [cite\_start]**Lista de Ciudades (PageCities)** [cite: 189]
      * [cite\_start]**Responsabilidad**: Exploración de ciudades y sus circuitos[cite: 190].
      * [cite\_start]**Estado**: `ciudades`, `ciudadesFiltradas`, `selectedCiudad`[cite: 191].
      * **Funcionalidades**:
          * [cite\_start]Búsqueda en tiempo real[cite: 193].
          * [cite\_start]Visualización en grid responsive[cite: 194].
          * [cite\_start]Modal con circuitos por ciudad[cite: 195].

## INSTALACION Y EJECUCION DEL PROYECTO

**Requisitos previos**:

  * [cite\_start]Java 17+[cite: 198].
  * [cite\_start]Maven 3.6+[cite: 199].
  * [cite\_start]Base de datos (configurada en `application.properties`)[cite: 200].
  * [cite\_start]Servidor web (Apache, Nginx, o servidor de desarrollo)[cite: 201].

<!-- end list -->

```bash
# Clonar el repositorio
gh repo clone ItIsabel/APICatai

# Ejecutar backend
mvn spring-boot:run

# Navegar al directorio del proyecto
cd cliente

# Instalar las dependencias
npm install

# Ejecutar el servidor de desarrollo
npm run dev
# o con yarn:
yarn dev
```

[cite\_start][cite: 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218]

## Ejemplos de Uso Completos

**Buscar circuitos de 7 días**

```bash
curl -X GET "http://localhost:8080/circuitos?dias=7"
```

[cite\_start][cite: 221, 222]

**Buscar circuitos que pasan por Madrid**

```bash
curl -X POST "http://localhost:8080/buscar" \
-H "Content-Type: application/json" \
-d '{"nombreCiudad": "Madrid"}'
```

[cite\_start][cite: 224, 225, 226, 227]

**Obtener extensiones de un circuito**

```bash
curl -X POST "http://localhost:8080/extensiones/1"
```

[cite\_start][cite: 229, 230]
#### Diseño del front con Penpot:
https://design.penpot.app/#/view?file-id=518f9b2f-adb9-81b5-8006-75bb3fd7401d&page-id=518f9b2f-adb9-81b5-8006-75bb3fd7401e&section=interactions&index=0&share-id=dfec20eb-20e2-80c9-8006-75ce7cb8fe36
