# Películas y Directores: Cine Mundo

## Datos del grupo
## Integrantes
Raúl Alejandro Luna Vizcaíno
Joffre Steven Verdezoto Tejena
## Carrera
Ingeniería Informatica
## Materia
Desarrollo de aplicaciones web
## Proyecto
Películas y directores: Cine Mundo
## Fecha de entrega 
3 de febrero de 2025

## Título del Proyecto
**Cine Mundo (Django + React + OAuth 2.0)**

El presente proyecto consiste en el trabajo final de la materia de desarrollo de aplicaciones web, con la finalidad de demostrar los conocimientos adquiridos durante el curso. Se establece una arquitectura desacoplada con un backend en **Django (API REST)** y un frontend en **React**.
Este proyecto es una aplicación web desacoplada para la gestión cinematográfica. Implementa un flujo completo de autenticación y operaciones CRUD, demostrando el uso de estados globales, interceptores y diseño profesional con Material UI.

## Objetivo
Implementar un sistema robusto de gestión de catálogo con autenticación **OAuth 2.0**, garantizando la protección de rutas y la persistencia de datos mediante una API REST.

## Requisitos técnicos
* **Autenticación OAuth con Django:** 
Flujo OAuth 2.0 con intercambio de tokens.
* **Seguridad:** 
Gestión de tokens en `localStorage` e interceptores de Axios para inyección automática en Headers (Bearer Token).
* **Rutas protegidas:** 
Uso de React Router para restringir acceso a usuarios no autenticados.
* **Formularios:** 
Creación y edición de Directores y Películas con validaciones.
* **Arquitectura:** 
Separación de responsabilidades en Servicios, Contextos y Componentes.
* **UI/UX:** Interfaz responsiva con Material UI y temática espacial personalizada.
* **Imágenes:** 
Procesamiento y conversión de archivos a `Base64`.

## Otras características
* **Página de login:** 
Autenticación OAuth en la ruta `/login`.
* **Gestión de Catálogo:** 
Páginas para agregar y editar Directores y Películas.
* **Sistema de logout:** 
Revocación de token y limpieza de sesión.
* **Interceptores de Axios:** 
Autorización centralizada.

## Estructura del Proyecto
```text
    src
    │   App.css
    │   App.jsx
    │   index.css
    │   main.jsx
    │
    ├───api
    │       axiosConfig.js
    │
    ├───assets
    │       react.svg
    │
    ├───components
    │       ConfirmDialog.jsx
    │       DirectorForm.jsx
    │       LoadingScreen.jsx
    │       MovieForm.jsx
    │       MovieList.jsx
    │
    ├───context
    │       SnackbarContext.jsx
    │
    ├───pages
    │       Directores.jsx
    │       Login.jsx
    │       Movies.jsx
    │
    ├───services
    │       api.js
    │       authService.js
    │       directorService.js
    │       movieService.js
    │
    └───utils
           base64.js
    

## ⚙️ Instalación y Configuración

Para configurar el entorno de desarrollo, abre la carpeta de tu repositorio en VS Code y ejecuta los siguientes comandos:

### Prerrequisitos
* 1. Tener el **Backend (Django)** en ejecución en `http://127.0.0.1:8000`.
* Tener instalado **Node.js** (versión 18 o superior).

### 2. Clonar e Instalar dependencias
```bash
# Clonar el repositorio
git clone [URL_DE_TU_REPOSITORIO]

# Entrar a la carpeta del proyecto
cd cine-mundo-frontend

### Comenzar instalación

    ### 1. Inicialización del proyecto (Vite)
```bash
npm create vite@latest cine-mundo-frontend
npm install @mui/icons-material

    ### 2. Instalar las dependencias base

   ```bash
   npm install
   ```

3. Instalar Material UI y sus dependencias
```bash
npm install @mui/material @emotion/react @emotion/styled
```
4. Instalar Axios (Necesario para consumo de API)
```bash
npm install axios
```
5. Instalar React Router (Necesario para navegación)
```bash
npm install react-router-dom
```
### Comandos útiles
- Ejecutar el servidor de desarrollo
    ```bash
    npm run dev
    ```
- Comprobar versión de dependencias
    ```bash
    npm list
    ```
- Limpiar dependencias
    ```bash
    rm -rf node_modules
    npm install
    ```

### Comandos git
- Verificar los archivos modificados
    ```bash
    git status
    ```
- Agregar archivos al área de preparación
    ```bash
    git add .
    ```
- Realizar un commit
 ```bash
git commit -m "Escribe aquí la descripción de tus cambios"
 ```
- Enviar los cambios a github
 ```bash
git push
 ```