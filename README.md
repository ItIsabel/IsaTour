# IsaTour 1.2.0

Es una SPA en el front y una API Rest en el back para la gestión de circuitos turísticos, ciudades y touroperadores.

## 🚀 Características Principales

  * **Gestión de Circuitos**: Permite la visualización, filtrado y ordenación de circuitos turísticos.
  * **Exploración de Ciudades**: Facilita la búsqueda y exploración de ciudades con circuitos disponibles.
  * **Filtros Avanzados**: Ofrece opciones de filtrado por país, duración y touroperador.
  * **Autenticación JWT**: Sistema seguro de autenticación para touroperadores.
  * **CRUD Completo**: Los touroperadores pueden crear, leer, actualizar y eliminar sus propios circuitos.
  * **Gestión de Meses**: Control de los meses de operación de cada circuito.
  * **Interfaz Responsive**: Cuenta con un diseño adaptativo para dispositivos móviles y de escritorio.
  * **Modo Oscuro**: Permite la alternancia entre un tema claro y uno oscuro.
    
## 🆕 Novedades en la Versión 1.2.0

### Backend
  * **Sistema de Autenticación**: Implementación completa de JWT con BCrypt para contraseñas.
  * **Gestión de Touroperadores**: Nuevo módulo para registro y autenticación de operadores turísticos.
  * **CRUD de Circuitos**: Endpoints completos para crear, actualizar y eliminar circuitos.
  * **Gestión de Meses**: Nueva funcionalidad para asignar meses de operación a los circuitos.
  * **Seguridad Mejorada**: Filtro JWT con validación de tokens y logging de intentos de acceso.
  * **CORS Configurable**: Configuración de orígenes permitidos mediante variables de entorno.

### Mejoras de Seguridad
  * Validación de propiedad de circuitos antes de operaciones CRUD.
  * Logging detallado de intentos de autenticación.
  * Control de acceso basado en roles (admin/touroperador).
  * Protección contra tokens expirados y malformados.

## Equipo de Desarrollo

  * **Backend**: Desarrollado con Spring Boot, JPA, Spring Security y MySQL.
  * **Frontend**: Implementado con Lit Element, CSS3 y JavaScript ES6+.
  * **Diseño**: Interfaz moderna y responsive.

## BACKEND

La API está construida con Spring Boot y sigue una arquitectura por capas:

  * **Controllers**: Capa de presentación que maneja las peticiones HTTP.
  * **Services**: Capa de lógica de negocio.
  * **Repositories**: Capa de acceso a datos usando Spring Data JPA.
  * **Models**: Entidades JPA y DTOs para transferencia de datos.
  * **Config**: Configuración de seguridad, JWT y CORS.

### Endpoints Disponibles

#### 🔐 Autenticación

`POST /auth/login`

Autentica un touroperador y devuelve un token JWT.

**Cuerpo de la petición**:

```json
{
  "usr": "touroperador_usuario",
  "password": "contraseña_segura"
}
```

**Respuesta**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tourOperador": "Catai Tours",
  "redirectUrl": "/circuitos/Catai Tours"
}
```

---

`POST /auth/register`

Registra un nuevo touroperador (solo disponible para administradores).

**Headers requeridos**:
```
Authorization: Bearer {admin_token}
```

**Cuerpo de la petición**:

```json
{
  "name": "Nuevo Tours",
  "usr": "nuevo_usuario",
  "password": "contraseña_segura"
}
```

**Respuesta**:

```json
{
  "message": "Tour operador registrado exitosamente",
  "tourOperador": "Nuevo Tours",
  "usr": "nuevo_usuario"
}
```

#### 🗺️ Circuitos

`POST /circuitos`

Obtiene todos los circuitos disponibles con filtros opcionales. **Público - No requiere autenticación**.

**Cuerpo de la petición** (opcional):

```json
{
  "nombrePais": "España",
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

---

`GET /circuitos/{touroperador}`

Obtiene todos los circuitos de un touroperador específico. **Requiere autenticación**.

**Headers requeridos**:
```
Authorization: Bearer {token}
```

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

---

`POST /circuitos/{touroperador}`

Crea un nuevo circuito para el touroperador. **Requiere autenticación**.

**Headers requeridos**:
```
Authorization: Bearer {token}
```

**Cuerpo de la petición**:

```json
{
  "tour": {
    "nombre": "Nuevo Circuito",
    "dias": 10,
    "precio": 1200.0,
    "url": "https://example.com/circuito"
  },
  "ciudades": [1, 2, 3],
  "meses": [6, 7, 8, 9]
}
```

**Respuesta**: Retorna el circuito creado con código 201.

---

`PUT /circuitos/{touroperador}/{tourId}`

Actualiza un circuito existente. **Requiere autenticación**.

**Headers requeridos**:
```
Authorization: Bearer {token}
```

**Cuerpo de la petición**:

```json
{
  "tour": {
    "nombre": "Circuito Actualizado",
    "dias": 12,
    "precio": 1500.0,
    "url": "https://example.com/circuito-actualizado"
  },
  "ciudades": [1, 2, 3, 4],
  "meses": [5, 6, 7, 8, 9]
}
```

**Respuesta**: Retorna el circuito actualizado.

---

`DELETE /circuitos/{touroperador}/{tourId}`

Elimina un circuito. **Requiere autenticación**.

**Headers requeridos**:
```
Authorization: Bearer {token}
```

**Respuesta**: Código 204 (No Content) si la eliminación es exitosa.

#### 🏙️ Ciudades

`GET /ciudades`

Obtiene todas las ciudades disponibles en los circuitos, ordenadas alfabéticamente por nombre. **Público - No requiere autenticación**.

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

---

`GET /ciudades/{touroperador}/{tourId}/ciudades`

Obtiene las ciudades de un circuito específico. **Requiere autenticación**.

**Headers requeridos**:
```
Authorization: Bearer {token}
```

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
    "nombre": "Sevilla",
    "pais": "España"
  }
]
```

#### 🌍 Países

`POST /ciudades/paises`

Obtiene todos los países donde se encuentran las ciudades disponibles, opcionalmente filtrados por criterios de circuitos. **Público - No requiere autenticación**.

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

#### 📅 Meses

`GET /meses/{tourId}/meses`

Obtiene los meses de operación de un circuito específico. **Requiere autenticación**.

**Headers requeridos**:
```
Authorization: Bearer {token}
```

**Respuesta**:

```json
[6, 7, 8, 9]
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

#### CreateTourRequest / UpdateTourRequest

```java
{
  "tour": TourDto,            // Datos del circuito
  "ciudades": List<Long>,     // IDs de ciudades
  "meses": List<Integer>      // Meses de operación (1-12)
}
```

#### TourOperadorDto

```java
{
  "id": Long,
  "name": String,             // Nombre del touroperador
  "usr": String,              // Usuario para login
  "password": String          // Contraseña (solo en registro)
}
```

**Nota**: Todos los campos de los filtros son opcionales y pueden combinarse para filtrados más específicos.

### Relaciones entre Entidades

  * **Tour (Circuito) ↔ City (Ciudad)**: Relación Many-to-Many a través de la tabla `circuito_ciudad` (TourCity).
  * **Tour (Circuito) ↔ TourMonth (Mes)**: Relación One-to-Many para los meses de operación.
  * **TourOperador ↔ Tour (Circuito)**: Relación One-to-Many (un operador puede tener múltiples circuitos).

### Seguridad y Autorización

El sistema implementa autenticación basada en JWT con las siguientes características:

  * **Endpoints Públicos**: `/auth/login`, `/circuitos` (POST), `/ciudades`, `/ciudades/paises`
  * **Endpoints Autenticados**: Todos los demás requieren token JWT válido
  * **Validaciones**:
    * El touroperador solo puede modificar/eliminar sus propios circuitos
    * Solo el administrador puede registrar nuevos touroperadores
    * Los tokens tienen una validez de 24 horas
  * **Seguridad de Contraseñas**: Hash BCrypt con salt automático

### Configuración de Seguridad

El archivo `application.properties` requiere las siguientes variables de entorno:

```properties
# Base de datos
DATABASE_URL=jdbc:mysql://localhost:3306/isatour
DB_USER=usuario
DB_PASSWORD=contraseña

# JWT
JWT_SECRET=clave_secreta_minimo_256_bits

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://midominio.com

# Administrador
ADMINISTRADOR=admin_username
```

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
  * MySQL 8.0+.
  * Node.js 18+ y npm (para el frontend).

### Backend

```bash
# Clonar el repositorio
gh repo clone ItIsabel/APICatai

# Configurar variables de entorno
# Crear archivo .env o configurar en el sistema:
export DATABASE_URL=jdbc:mysql://localhost:3306/isatour
export DB_USER=tu_usuario
export DB_PASSWORD=tu_contraseña
export JWT_SECRET=tu_clave_secreta_segura_minimo_256_bits
export ALLOWED_ORIGINS=http://localhost:3000
export ADMINISTRADOR=admin

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
```

### Configuración de Variables de Entorno

#### Backend (application.properties)
Las variables de entorno requeridas son:
- `DATABASE_URL`: URL de conexión a MySQL
- `DB_USER`: Usuario de la base de datos
- `DB_PASSWORD`: Contraseña de la base de datos
- `JWT_SECRET`: Clave secreta para JWT (mínimo 256 bits)
- `ALLOWED_ORIGINS`: Orígenes permitidos para CORS (separados por coma)
- `ADMINISTRADOR`: Nombre de usuario del administrador

#### Frontend (.env)
```bash
# archivo .env en el directorio cliente/
VITE_APP_API_URL=http://localhost:8080
```

### Primera Ejecución

1. Asegúrate de que MySQL esté ejecutándose
2. Crea la base de datos: `CREATE DATABASE isatour;`
3. La estructura de tablas se creará automáticamente gracias a Hibernate
4. Registra el primer touroperador a través del endpoint `/auth/register` usando credenciales de administrador

### Testing

```bash
# Backend - ejecutar tests
mvn test

# Frontend - ejecutar tests (si están configurados)
npm test
```

## 📝 Notas de Desarrollo

  * Los tokens JWT expiran después de 24 horas
  * Las contraseñas se hashean con BCrypt antes de almacenarse
  * El sistema valida que los touroperadores solo puedan modificar sus propios circuitos
  * Los logs de seguridad incluyen IP del cliente para auditoría
  * CORS está configurado para aceptar múltiples orígenes

## 🔄 Migración desde la versión 1.1.1

Si estás actualizando desde la versión 1.1.1:

1. Actualiza las dependencias del backend (Spring Security, JWT, BCrypt)
2. Añade las nuevas variables de entorno requeridas
3. Ejecuta las migraciones de base de datos para crear las tablas `touroperador` y `circuito_mes`
4. Configura el usuario administrador inicial
5. Actualiza los clientes para incluir tokens JWT en las peticiones autenticadas

## 📄 Licencia

[Especificar la licencia del proyecto]

## 👥 Contribuciones

[Instrucciones para contribuir al proyecto]

## 📞 Contacto

[Información de contacto del equipo]
