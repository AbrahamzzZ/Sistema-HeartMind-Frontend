# Sistema HeartMind - Frontend

## Descripción

Frontend de la aplicación HeartMind, desarrollado con Angular 20. Proporciona una interfaz moderna y responsiva para que los usuarios puedan:
- Registrarse e iniciar sesión
- Realizar evaluaciones de riesgo cardiovascular
- Responder cuestionarios interactivos
- Acceder a contenidos educativos
- Jugar el juego de clasificación de síntomas
- Ver predicciones de riesgo basadas en un modelo de machine learning
- Consultar su historial de evaluaciones y resultados

## Stack tecnológico

- **Angular**: v20.3.0 - Framework principal
- **Angular Material**: v20.2.14 - Componentes de UI
- **Angular CDK**: v20.2.14 - Componentes y utilidades
- **TypeScript**: Lenguaje de programación
- **RxJS**: v7.8.0 - Programación reactiva
- **SweetAlert2**: v11.26.25 - Alertas personalizadas
- **XLSX**: v0.18.5 - Exportación de reportes a Excel
- **Prettier**: Formateador de código
- **Karma + Jasmine**: Testing unitario

## Estructura del proyecto

```
Frontend/
├── src/
│   ├── app/
│   │   ├── core/              # Servicios, guardias, interceptores
│   │   │   ├── services/      # Servicios HTTP y lógica compartida
│   │   │   ├── guards/        # Guardias de autenticación y roles
│   │   │   └── interceptors/  # Interceptores HTTP
│   │   │
│   │   ├── module/            # Módulos de características (lazy loading)
│   │   │   ├── auth/          # Registro e inicio de sesión
│   │   │   ├── dashboard/     # Panel principal del usuario
│   │   │   ├── evaluacion/    # Evaluación de riesgo cardiovascular
│   │   │   ├── cuestionarios/ # Gestión de cuestionarios
│   │   │   ├── contenidos/    # Contenidos educativos
│   │   │   ├── juego/         # Juego de clasificación
│   │   │   ├── predicciones/  # Predicciones del modelo ML
│   │   │   └── admin/         # Panel de administración
│   │   │
│   │   ├── shared/            # Componentes y utilidades compartidas
│   │   │   ├── components/    # Componentes reutilizables
│   │   │   ├── directives/    # Directivas personalizadas
│   │   │   ├── pipes/         # Pipes personalizados
│   │   │   ├── models/        # Modelos e interfaces TypeScript
│   │   │   └── utils/         # Funciones utilitarias
│   │   │
│   │   ├── app.config.ts      # Configuración de la aplicación
│   │   ├── app.routes.ts      # Rutas principales (lazy loading)
│   │   ├── app.ts             # Componente raíz
│   │   └── app.scss           # Estilos globales
│   │
│   ├── environments/          # Configuraciones por entorno
│   │   ├── environment.ts     # Producción
│   │   └── environment.development.ts # Desarrollo
│   │
│   ├── public/                # Activos estáticos (imágenes, etc.)
│   │   └── images/
│   │
│   ├── styles.scss            # Estilos globales
│   ├── main.ts                # Punto de entrada
│   └── index.html             # HTML principal
│
├── angular.json               # Configuración de Angular CLI
├── tsconfig.json              # Configuración de TypeScript
├── tsconfig.app.json          # TypeScript para aplicación
├── tsconfig.spec.json         # TypeScript para tests
├── karma.conf.js              # Configuración de Karma
├── package.json               # Dependencias
├── dockerfile                 # Para contenerización
├── docker-compose.yml         # Orquestación Docker
└── README.md
```

## Instalación y configuración

### Requisitos previos
- Node.js v20 o superior
- npm v10 o superior
- Angular CLI v20.3.13

### Instalación

```bash
cd Frontend
npm install
```

## Desarrollo local

### Servidor de desarrollo

```bash
npm start
# o
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`. Se recargará automáticamente al modificar los archivos.

### Construcción del proyecto

Para compilar la aplicación en modo producción:

```bash
npm run build
```

Los artefactos compilados se guardarán en el directorio `dist/`.

## Testing

### Pruebas unitarias

Para ejecutar las pruebas unitarias con Karma:

```bash
npm test
# o
ng test
```

### Pruebas end-to-end

Para pruebas E2E (si está configurado):

```bash
ng e2e
```

## Generación de componentes

Para generar nuevos componentes automáticamente:

```bash
ng generate component module/nombre/componentes/mi-componente
# o simplemente
ng generate component mi-componente
```

Para ver todas las opciones disponibles:

```bash
ng generate --help
```

## Docker

### Construir imagen Docker

```bash
docker build -t heartemind-frontend:latest .
```

### Ejecutar con Docker Compose

Desde la raíz del proyecto:

```bash
docker-compose up -d
```

La aplicación estará disponible en `http://localhost:80`.

## Variables de entorno

Las configuraciones por entorno se encuentran en `src/environments/`:

- `environment.ts` - Configuración de producción
- `environment.development.ts` - Configuración de desarrollo

Incluyen:
- URL del API backend
- Configuración de características
- Variables de configuración específicas del entorno

## Arquitectura

### Principios de diseño

- **Modularidad**: Cada funcionalidad está en su propio módulo con lazy loading
- **Reusabilidad**: Componentes compartidos en la carpeta `shared/`
- **Tipado fuerte**: TypeScript para mayor seguridad
- **Reactividad**: RxJS para manejo de datos y eventos
- **Separación de responsabilidades**: Servicios, guardias e interceptores separados

### Flujo de autenticación

1. El usuario inicia sesión
2. Se obtiene un token JWT del backend
3. El token se almacena en `localStorage`
4. El interceptor HTTP añade el token a cada petición
5. Los guardias protegen las rutas requiriendo autenticación
6. Al cerrar sesión, se elimina el token

## Componentes principales

### Autenticación (`module/auth/`)
- Registro de usuarios
- Inicio de sesión
- Recuperación de contraseña

### Evaluación (`module/evaluacion/`)
- Formulario de evaluación de riesgo
- Resultado de la evaluación
- Historial de evaluaciones

### Cuestionarios (`module/cuestionarios/`)
- Listado de cuestionarios
- Resolver cuestionarios
- Historial de respuestas

### Contenidos (`module/contenidos/`)
- Contenidos educativos por categoría
- Videos y materiales educativos

### Juego (`module/juego/`)
- Juego interactivo de clasificación
- Registro de puntuaciones y resultados

### Predicciones (`module/predicciones/`)
- Consulta de predicciones del modelo ML
- Reportes personalizados de riesgo

## Servicios principales

Los servicios están centralizados en `core/services/`:

- `UsuarioService` - Gestión de usuarios y autenticación
- `EvaluacionService` - Evaluaciones de riesgo
- `CuestionarioService` - Gestión de cuestionarios
- `ContenidoService` - Contenidos educativos
- `JuegoService` - Interacción con juegos
- `PrediccionService` - Predicciones del modelo ML
- `AuthService` - Autenticación y manejo de tokens

## Guardias de ruta

Los guardias protegen el acceso a rutas:

- `AuthGuard` - Requiere estar autenticado
- `RoleGuard` - Valida roles de usuario (Admin/Usuario)
- `AdminGuard` - Solo administradores

## Interceptores HTTP

- `JwtInterceptor` - Añade el token a cada petición
- `ErrorInterceptor` - Maneja errores globales

## Estilos

### Temas

Se utiliza Angular Material para los estilos. Los temas personalizados están definidos en:
- `styles.scss` - Estilos globales y variables SCSS

### Paleta de colores

HeartMind utiliza una paleta de colores específica:
- Primario: Tonos azules (confianza, salud)
- Secundario: Tonos verdes (bienestar)
- Riesgos: Tonos rojos/naranjas (alertas)

## Notas finales
