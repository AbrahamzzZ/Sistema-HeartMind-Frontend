# Sistema HeartMind Frontend

## Descripción

Este repositorio contiene el frontend del proyecto Sistema HeartMind. La aplicación está desarrollada en Angular 20 y se ejecuta dentro de un contenedor Docker para ofrecer una interfaz moderna, responsiva y segura para usuarios y administradores. Permite registrar usuarios, autenticarse, completar evaluaciones de riesgo cardiovascular, responder cuestionarios, consultar contenidos educativos, participar en juegos interactivos y revisar predicciones de riesgo.

## Arquitectura del frontend

El frontend sigue una arquitectura modular basada en Angular con separación clara entre capas y responsabilidades:

- `src/app/core/` - Servicios, guardias, interceptores y utilidades compartidas de la aplicación.
- `src/app/module/` - Módulos de características organizados por dominio, con carga perezosa.
- `src/app/shared/` - Componentes, pipes, directivas y modelos reutilizables.
- `src/environments/` - Configuración específica por entorno.
- `src/app/app.routes.ts` - Definición de rutas principales y navegación.
- `src/app/app.config.ts` - Configuración global de la aplicación.
- `src/public/` - Recursos estáticos como imágenes.

## Módulos principales

### Autenticación
- Registro e inicio de sesión.
- Gestión del token JWT.
- Protección de rutas mediante guardias.

### Evaluaciones de riesgo
- Formulario de evaluación.
- Visualización de resultados.
- Historial de evaluaciones por usuario.

### Cuestionarios
- Consulta de cuestionarios disponibles.
- Resolución de cuestionarios.
- Historial de respuestas.

### Contenidos educativos
- Visualización de contenidos por categoría.
- Acceso a materiales educativos.

### Juegos educativos
- Juego de clasificación interactivo.
- Registro de resultados y puntuaciones.

### Predicciones
- Consulta de predicciones del modelo de machine learning.
- Visualización de reportes de riesgo.

## Herramientas utilizadas

- Angular 20
- TypeScript
- RxJS
- Angular Material
- SCSS
- Docker / Docker Compose

## Estructura del proyecto

```text
Frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   ├── module/
│   │   ├── shared/
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── app.ts
│   │   └── app.scss
│   ├── environments/
│   ├── public/
│   ├── styles.scss
│   ├── main.ts
│   └── index.html
├── angular.json
├── package.json
├── tsconfig.json
├── docker-compose.yml
├── dockerfile
└── README.md
```

## Variables y configuración

El frontend consume la API del backend a través de las variables definidas en `src/environments/`:

- `environment.ts` - Configuración de desarrollo/producción local.
- `environment.development.ts` - Configuración específica para desarrollo.

Actualmente apunta a:
- `apiUrl = http://localhost:8082/public/index.php`

## Clonar el repositorio

```bash
git clone https://github.com/AbrahamzzZ/Sistema-HeartMind-Frontend
cd "Sistema-HeartMind-Frontend"
```

## Levantar el proyecto con Docker

Desde la raíz del proyecto:

```bash
docker compose up -d
```

Si tu versión de Docker utiliza `docker-compose` en lugar de `docker compose`:

```bash
docker-compose up -d
```

### Comandos útiles

- Ver contenedores activos:
  ```bash
  docker compose ps
  ```
- Ver logs del frontend:
  ```bash
  docker compose logs -f frontend
  ```
- Detener los contenedores:
  ```bash
  docker compose down
  ```
- Reconstruir y levantar:
  ```bash
  docker compose up -d --build
  ```

## Acceso a servicios

- Aplicación frontend: `http://localhost:4200`

## Desarrollo local

### Requisitos previos

- Node.js 20.x o superior
- npm 10.x o superior
- Angular CLI 20.x

### Instalar dependencias

```bash
npm install
```

### Ejecutar la aplicación localmente

```bash
npm start
```

o

```bash
ng serve
```

La aplicación quedará disponible en `http://localhost:4200/`.

## Notas finales

Asegúrate de tener Docker y Node.js instalados y funcionando. Si necesitas cambiar la URL del backend o la configuración del entorno, actualiza los archivos de `src/environments/` y vuelve a levantar la aplicación.