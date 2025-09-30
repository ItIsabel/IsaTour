# IsaTour 1.1.1

Es una SPA en el front y una API Rest en el back para la gestión de circuitos turísticos, ciudades y extensiones de viaje.

## 🚀 Características Principales

  * **Gestión de Circuitos**: Permite la visualización, filtrado y ordenación de circuitos turísticos.
  * **Exploración de Ciudades**: Facilita la búsqueda y exploración de ciudades con circuitos disponibles.
  * **Filtros Avanzados**: Ofrece opciones de filtrado por país, duración y touroperador.
  * **Interfaz Responsive**: Cuenta con un diseño adaptativo para dispositivos móviles y de escritorio.
  * **Modo Oscuro**: Permite la alternancia entre un tema claro y uno oscuro.
  * **Arquitectura Modular**: Desarrollada con componentes reutilizables utilizando Lit Element.

## Equipo de Desarrollo

  * **Backend**: Desarrollado con Spring Boot, JPA y MySQL.
  * **Frontend**: Implementado con Lit Element, CSS3 y JavaScript ES6+.
  * **Diseño**: Interfaz moderna y responsive.

## BACKEND

La API está construida con Spring Boot y sigue una arquitectura por capas:

  * **Controllers**: Capa de presentación que maneja las peticiones HTTP.
  * **Services**: Capa de lógica de negocio.
  * **Repositories**: Capa de acceso a datos usando Spring Data JPA.
  * **Models**: Entidades JPA y DTOs para transferencia de datos.

### Endpoints Disponibles

#### 🗺️ Circuitos

`POST /circuitos`

Obtiene todos los circuitos disponibles con filtros opcionales.

**Cuerpo de la petición** (opcional):

```json
{
  "nombrePais": "España",
  "idCiudad": 1,
  "dias": 7,
  "touroperador": "Catai"
}
```

**Nota**: Todos los campos del filtro son opcionales. Si no se envía body o se envía vacío, retorna todos los circuitos.

**Respuesta**:

```json
[
  {
    "id": 1,
    "nombre": "Circuito Andalucía",
    "dias": 7,
    "precio": 850.0,
    "url": "https://catai.es/circuito-andalucia",
    "touroperador": "Catai"
  }
]
```

**Ejemplos de uso**:

```bash
# Todos los circuitos
POST /circuitos
Content-Type: application/json
{}

# Circuitos de 7 días
POST /circuitos
Content-Type: application/json
{
  "dias": 7
}

# Circuitos de un touroperador específico
POST /circuitos
Content-Type: application/json
{
  "touroperador": "Catai"
}

# Circuitos por país
POST /circuitos
Content-Type: application/json
{
  "nombrePais": "España"
}

# Circuitos por ciudad
POST /circuitos
Content-Type: application/json
{
  "idCiudad": 1
}

# Combinación de filtros
POST /circuitos
Content-Type: application/json
{
  "nombrePais": "España",
  "dias": 7,
  "touroperador": "Catai"
}
```

#### 🏙️ Ciudades

`GET /ciudades`

Obtiene todas las ciudades disponibles en los circuitos, ordenadas alfabéticamente por nombre.

**Respuesta**:

```json
[
  {
    "id": 1,
    "nombre": "Madrid",
    "pais": "España"
  },
  {
    "id": 2,
    "nombre": "Barcelona",
    "pais": "España"
  }
]
```

#### 🌍 Países

`POST /ciudades/paises`

Obtiene todos los países donde se encuentran las ciudades disponibles, opcionalmente filtrados por criterios de circuitos.

**Cuerpo de la petición** (opcional):

```json
{
  "dias": 7,
  "touroperador": "Catai"
}
```

**Respuesta**:

```json
[
  "España",
  "Francia",
  "Italia"
]
```

**Ejemplos de uso**:

```bash
# Todos los países
POST /ciudades/paises
Content-Type: application/json
{}

# Países con circuitos de 7 días
POST /ciudades/paises
Content-Type: application/json
{
  "dias": 7
}

# Países con circuitos de un touroperador específico
POST /ciudades/paises
Content-Type: application/json
{
  "touroperador": "Catai"
}
```

### Modelo de Datos

#### TourDto (Circuito)

```java
{
  "id": Long,
  "nombre": String,
  "dias": int,
  "precio": float,
  "url": String,
  "touroperador": String
}
```

#### CityDto (Ciudad)

```java
{
  "id": Long,
  "nombre": String,
  "pais": String
}
```

#### TourFilterDto (para búsquedas)

```java
{
  "idCiudad": Long,           // ID de la ciudad
  "idCircuito": Long,         // ID del circuito
  "nombrePais": String,       // Nombre del país
  "dias": Integer,            // Duración en días
  "touroperador": String      // Nombre del touroperador
}
```

**Nota**: Todos los campos son opcionales y pueden combinarse para filtrados más específicos.

### Relaciones entre Entidades

  * **Tour (Circuito) ↔ City (Ciudad)**: Relación Many-to-Many a través de la tabla `circuito_ciudad` (TourCity).
### Lógica de Filtrado

El sistema de filtrado en `/circuitos` sigue esta jerarquía:

1. **Filtro de ubicación** (excluyente):
   - Si se proporciona `nombrePais`: filtra circuitos por país
   - Si se proporciona `idCiudad`: filtra circuitos por ciudad
   - Si no se proporciona ninguno: retorna todos los circuitos

2. **Filtro de días**: Aplicado sobre el resultado del filtro de ubicación
   - Filtra circuitos que tengan exactamente el número de días especificado

3. **Filtro de touroperador**: Aplicado sobre el resultado de los filtros anteriores
   - Filtra circuitos del touroperador especificado

## FRONTEND

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
├── style.css                          # Estilos globales
└── package.json                       # Dependencias del proyecto
```

### 🎨 Arquitectura de Componentes

  * **Componente Principal (MyApp)**
      * **Responsabilidad**: Gestión de rutas y vistas principales.
      * **Estado**: `currentView` para controlar la vista activa.
      * **Eventos**: Escucha eventos de navegación del header.
  * **Header (AppHeader)**
      * **Responsabilidad**: Navegación entre secciones y toggle de modo oscuro.
      * **Props**: `currentPage` para indicar la página activa.
      * **Eventos**: Emite `page-change` para cambios de navegación.
  * **Lista de Circuitos (PageCircuits)**
      * **Responsabilidad**: Visualización y filtrado de circuitos.
      * **Estado**: `circuitos`, `loading`, `error`, `filtros` y `ordenación`.
      * **Funcionalidades**:
          * Filtrado por país, días y touroperador.
          * Ordenación por precio y duración.
          * Carga de extensiones (popup modal).
          * Búsqueda de circuitos por país.
  * **Lista de Ciudades (PageCities)**
      * **Responsabilidad**: Exploración de ciudades y sus circuitos.
      * **Estado**: `ciudades`, `ciudadesFiltradas`, `selectedCiudad`.
      * **Funcionalidades**:
          * Búsqueda en tiempo real.
          * Visualización en grid responsive.
          * Modal con circuitos por ciudad.

### 🔧 Servicios del Frontend

#### CircuitoService
Maneja todas las operaciones relacionadas con circuitos:
- `getCircuitos(filters)`: Obtiene circuitos con filtros opcionales
- `getExtensiones(circuitoId)`: Obtiene extensiones de un circuito
- `getCountryList()`: Obtiene lista de países disponibles
- `getCircuitosByCountry(country)`: Busca circuitos por país

#### CiudadService
Gestiona las operaciones de ciudades:
- `getCiudades()`: Obtiene todas las ciudades
- `fetchCircuitos(filtroDto)`: Busca circuitos que incluyan una ciudad específica

## INSTALACION Y EJECUCION DEL PROYECTO

**Requisitos previos**:

  * Java 17+.
  * Maven 3.6+.
  * Base de datos (configurada en `application.properties`).
  * Node.js 18+ y npm (para el frontend).

### Backend

```bash
# Clonar el repositorio
gh repo clone ItIsabel/APICatai

# Ejecutar backend
mvn spring-boot:run
```

### Frontend

```bash
# Navegar al directorio del cliente
cd cliente

# Instalar las dependencias
npm install

# Ejecutar el servidor de desarrollo
npm run dev
# o con yarn:
yarn dev
```

### Configuración de Variables de Entorno

Asegúrate de configurar la variable de entorno para la URL de la API en el frontend:

```bash
# archivo .env en el directorio cliente/
VITE_APP_API_URL=http://localhost:8080
```

