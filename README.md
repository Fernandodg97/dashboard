# Dashboard de Visualización de Datos

## Descripción
Este proyecto es un dashboard interactivo desarrollado con Vue.js que utiliza ECharts para la visualización de datos geográficos. El componente principal `EchartsMap.vue` permite visualizar datos en un mapa global con capacidades interactivas.

## Características Principales
- Visualización de datos en mapa global
- Interactividad con zoom y desplazamiento
- Tooltip informativo al pasar el cursor
- Visualización de datos con escala de colores
- Herramientas de exportación y visualización de datos

## Tecnologías Utilizadas
- Vue.js
- ECharts
- TypeScript
- Vite

## Estructura del Proyecto
```
src/
├── assets/         # Archivos estáticos (mapas geoJSON)
├── components/     # Componentes Vue
├── views/          # Vistas principales
├── router/         # Configuración de rutas
└── theme/          # Estilos y temas
```

## Instalación
1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```
3. Iniciar el servidor de desarrollo:
```bash
ionic serve
```

## Uso del Componente EchartsMap
```vue
<template>
  <EchartsMap
    :data="datos"
    title="Título del Mapa"
    subtitle="Subtítulo"
  />
</template>

<script setup>
const datos = [
  { name: 'País', value: 1000 },
  // ... más datos
]
</script>
```

## Requisitos
- Node.js
- npm o yarn 

---

# 🚀 Deploy de Ionic + Vue a GitHub Pages

Este proyecto muestra cómo compilar y desplegar una aplicación construida con **Ionic + Vue** en **GitHub Pages**, usando la rama `gh-pages`.

## 📦 Requisitos

- Node.js y npm instalados
- Git configurado
- Acceso de escritura al repositorio en GitHub

## 🧠 Aumentar memoria para el build

Algunas aplicaciones grandes pueden necesitar más memoria para compilar. Usamos la variable `NODE_OPTIONS` para aumentar el límite:

```bash
NODE_OPTIONS="--max_old_space_size=8192" ionic build
```

## 🛠 Configurar vite.config.ts

```bash
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'

export default defineConfig({
  base: '/dashboard/',
  plugins: [vue(), legacy()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```
⚠️ Cambia /dashboard/ por el nombre del subdirectorio que usas en GitHub Pages si es diferente.

## 🚀 Hacer el deploy
1. Instalar gh-pages

```bash
npm install --save-dev gh-pages
```

2. Agregar el script en package.json
```bash
"scripts": {
  "build": "ionic build",
  "deploy": "gh-pages -d dist"
}
```
3. Compilar la app
```bash
NODE_OPTIONS="--max_old_space_size=8192" ionic build
```

4. Subir el contenido de /dist a la rama gh-pages
```bash
npm run deploy
```
# 🌐 Configurar GitHub Pages
1. Ve a Settings > Pages en tu repositorio.

2. En Branch, selecciona:

- gh-pages

- /(root) como carpeta

3. Guarda los cambios.

# ✅ Ver tu sitio en línea
Después de unos segundos/minutos, estará disponible en:
```bash
https://<tu-usuario>.github.io/<repositorio>/
```
# 🧼 Notas
No es necesario subir la carpeta dist al repositorio.
gh-pages maneja automáticamente el push a la rama gh-pages.
Puedes repetir los pasos 3 y 4 cada vez que quieras actualizar el sitio.
