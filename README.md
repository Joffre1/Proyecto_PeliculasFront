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

## Objetivo
Implementar un sistema completo de autenticación OAuth con Django, incluyendo login, logout y protección de rutas.

## Requisitos técnicos
* **Autenticación OAuth con Django:** 
Uso de tokens para proteger el acceso.
* **Gestión de tokens:** 
Almacenamiento de tokens de acceso en `localStorage`.
* **Interceptores de Axios:** 
Configuración para agregar tokens automáticamente a las peticiones.
* **Rutas protegidas:** 
Uso de React Router para restringir acceso a usuarios no autenticados.
* **Formularios:** 
Creación y edición de Directores y Películas con validaciones.

## Nuevas características
* **Página de login:** 
Autenticación OAuth en la ruta `/login`.
* **Gestión de Catálogo:** 
Páginas para agregar y editar Directores y Películas.
* **Sistema de logout:** 
Revocación de token y limpieza de sesión.
* **Protección de rutas:** 
Seguridad basada en estado de autenticación.
* **Conversión de imágenes:** 
Procesamiento a base64 para envío al backend.
* **Interceptores de Axios:** 
Autorización centralizada.

## Estructura del Proyecto
```text
src/
 ├── api/
 │    └── axiosConfig.js
 ├── pages/
 │    ├── Login.jsx
 │    ├── Directores.jsx
 │    ├── Peliculas.jsx
 ├── components/
 │    ├── Navbar.jsx
 │    ├── FormDirector.jsx
 │    ├── FormPelicula.jsx
 ├── services/
 │    ├── authService.js
 │    ├── directorService.js
 │    ├── peliculaService.js
 ├── App.jsx
 └── main.jsx

## Instalación del proyecto

Para configurar el entorno de desarrollo, abre la carpeta de tu repositorio en VS Code y ejecuta los siguientes comandos:

    ### 1. Inicialización del proyecto (Vite)
```bash
npm create vite@latest cine-mundo-frontend
cd cine-mundo-frontend

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