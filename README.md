# Dashboard de Visualización de Datos

[![Vue](https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Ionic](https://img.shields.io/badge/Ionic_8-3880FF?style=for-the-badge&logo=ionic&logoColor=white)](https://ionicframework.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![ECharts](https://img.shields.io/badge/ECharts-AA344D?style=for-the-badge&logo=apacheecharts&logoColor=white)](https://echarts.apache.org/)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)

---

## Para recruiters

Dashboard interactivo de visualización de datos construido con **Vue 3 + Ionic + TypeScript**, pensado como panel de control para negocio y para operaciones técnicas, con actualización de métricas en tiempo real.

**¿Qué demuestra este proyecto?**

- Integración de tres librerías de gráficos distintas (ECharts, ApexCharts, Chart.js) dentro de una misma interfaz, cada una elegida según el tipo de visualización
- Componentes Vue reutilizables y tipados con TypeScript, parametrizados por props para que un mismo gráfico sirva en distintas pantallas con distintos datos
- Simulación de datos en tiempo real con actualización de gráficos cada segundo sin recargas ni parpadeos
- Mapa mundial interactivo (ECharts GeoMap) con zoom, tooltip y escala de color por volumen de datos
- Diseño responsive con maquetación adaptable por filas y columnas según el tamaño de pantalla
- Optimización del build: code splitting manual por librería (ECharts, Ionic, Chart.js) para reducir el peso del bundle inicial

| | |
|---|---|
| Demo | [vue3dashboard.netlify.app](https://vue3dashboard.netlify.app) |

---

## Funcionalidades

| Vista | Descripción |
|---|---|
| **Negocio** | KPIs de usuarios activos, ventas y retención; gráfico mixto de barras/área/línea; mapa mundial de descargas por país; gráfico de dona con el top 5 de países |
| **Técnico** | Monitorización de cola de procesamiento, servicios caídos y errores críticos; velocidad de red y usuarios online en tiempo real; carga de CPU y RAM con umbrales objetivo |
| **KPIs** | Listado de objetivos SMART (negocio y técnicos) organizados en acordeones, con la métrica, el plazo y la acción asociada a cada uno |

---

## Stack técnico

**Framework** — Vue 3 (Composition API + `<script setup>`) · Ionic 8 · TypeScript · Vite

**Visualización de datos** — ECharts / vue-echarts (mapas y gauges) · ApexCharts (series temporales y gráficos mixtos) · Chart.js (donas y áreas)

**Mobile-ready** — Capacitor (App, Haptics, Keyboard, Status Bar)

**Testing** — Vitest (unitario) · Cypress (e2e)

**Despliegue** — Netlify, con build diferenciado para evitar problemas de memoria en CI

---

## Arquitectura

```
src/
├── components/     # Gráficos reutilizables (Echarts*, Apex*, ChartJS*, SparkLine)
├── views/          # NegocioPage, TecnicoPage, KpiPage
├── router/         # Rutas de Ionic Vue Router
└── theme/          # Variables de estilo Ionic
```

Cada componente de gráfico expone props tipadas (datos, título, color, umbral objetivo) y encapsula su propia configuración de la librería subyacente, de forma que las vistas solo pasan datos y no conocen detalles de ECharts, ApexCharts o Chart.js.

---

## Retos técnicos resueltos

**Tiempo real sin sobrecargar el render** — Los gráficos de la vista Técnica actualizan sus datos cada segundo mediante `setInterval`, limitando el histórico a un número máximo de puntos (`shift`/`push`) para mantener el rendimiento estable en sesiones largas.

**Tamaño de bundle** — ECharts, Chart.js e Ionic se separan en chunks independientes (`manualChunks` en Vite) para que el navegador solo descargue lo necesario y el caché no se invalide al cambiar una librería.

**Build en Netlify** — El minificador pesado (`esbuild`) y el plugin de compatibilidad legacy se desactivan condicionalmente en Netlify (`NETLIFY=true`) para evitar errores de memoria durante el despliegue.

**Mapa mundial con GeoJSON** — El mapa se registra en ECharts a partir de un GeoJSON cargado dinámicamente, con ajuste manual de posición para territorios que por defecto se solapan (Islandia).

---

## Instalación y puesta en marcha

### Prerrequisitos

- Node.js y npm

### Pasos

```bash
git clone https://github.com/Fernandodg97/dashboard.git
cd dashboard
npm install
npm run dev
```

Disponible en `http://localhost:5173`.

### Otros comandos

```bash
npm run build       # build de producción
npm run test:unit   # tests unitarios (Vitest)
npm run test:e2e    # tests end-to-end (Cypress)
npm run deploy      # publica /dist en GitHub Pages (gh-pages)
```

---

## Autor

| | |
|---|---|
| **Fernando Diaz** | [github.com/Fernandodg97](https://github.com/Fernandodg97) |

---

## Licencia

[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es)
