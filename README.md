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
npm run dev
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