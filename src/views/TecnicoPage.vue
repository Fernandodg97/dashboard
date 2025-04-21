<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>📈 Técnico</ion-title>
      </ion-toolbar>
    </ion-header>


    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">🚀 Técnico</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Grid principal del Dashboard -->
      <ion-grid class="dashboard-grid">
        <!-- 🟢 Fila 1: 3 Columnas -->
        <ion-row class="ion-row-1">
          <ion-col size="12" size-lg="4">
            <div class="box">
              <spark-line v-bind="sparkData1" />
            </div>
          </ion-col>
          <ion-col size="6" size-lg="4">
            <div class="box">
              <spark-line v-bind="sparkData2" />
            </div>
          </ion-col>
          <ion-col size="6" size-lg="4">
            <div class="box">
              <spark-line v-bind="sparkData3" />
            </div>
          </ion-col>
        </ion-row>

        <!-- 🔵 Fila 2: 2 Columnas -->
        <ion-row class="ion-row-2">
          <ion-col size="12" size-md="3" push-md="9">
            <div class="box">
              <EchartsGauge :value="currentNetValue" title="VELOCIDAD RED (Mbps)" />
            </div>
          </ion-col>
          <ion-col size="12" size-md="9" pull-md="3">
            <!-- <div class="box">
              <ApexLineRT :series="series" title="Usuarios online" :kpi-target="70" color="#3b82f6" />
             -->
            <div class="box">
              <ChartJsDoughnut v-bind="doughnutSystemUsage" />
            </div>
          </ion-col>
        </ion-row>

        <!-- 🟠 Fila 3: 3 Columnas -->
        <!-- <ion-row class="ion-row-3">
          <ion-col size="12" size-lg="4.5">
            <div class="box">
              <ChartJSLineAreaRT chartType="line" title="Carga CPU" color="#10b981" />
            </div>
            <div class="box">
              <ApexLineRT :series="series" title="Usuarios online" :kpi-target="70" color="#3b82f6" />
            </div>
          </ion-col>
          <ion-col size="12" size-lg="4.5">
            <div class="box">
              <ChartJSLineAreaRT chartType="area" title="Memoria RAM" color="#3b82f6" :min=50 :max=70 />
            </div>
          </ion-col>
          <ion-col size="12" size-lg="3">
            <div class="box">
              <EchartsGaugeMultiple :segments="ringSegments" />
            </div>
          </ion-col>
        </ion-row> -->

        <!-- ########## 🟠 Fila 3: 3 Columnas FER ########## -->
        <ion-row class="ion-row-3">
          <ion-col size="12" size-md="3" push-md="9">
            <div class="box">
              <EchartsGaugeMultiple :segments="ringSegments" />
            </div>
          </ion-col>
          <ion-col size="12" size-md="9" pull-md="3">
            <div class="box">
              <ApexLineRT :series="series" title="Usuarios online" :kpi-target="70" color="#3b82f6" />
            </div>
          </ion-col>
        </ion-row>

      </ion-grid>
    </ion-content>
  </ion-page>
</template>



<script setup lang="ts">
/***** 🧰 DEPENDENCIAS ******/
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { ref, onMounted, onUnmounted, computed } from 'vue';

// Sparkline
import SparkLine from '@/components/SparkLine.vue';

// ApexLineChart Realtime
import ApexLineRT from '@/components/ApexLineRT.vue';

// Echarts
import EchartsGauge from '@/components/EchartsGaugeRed.vue';
import EchartsGaugeMultiple from '@/components/EchartsGaugeMultiple.vue';

// ChartJS
import ChartJSLineAreaRT from '@/components/ChartJSLineAreaRT.vue';
import ChartJsDoughnut from '@/components/ChartJsDoughnut.vue';

/***** 🛠️ CONSTANTES y VARIABLES *****/

// Constantes
const UPDATE_INTERVAL = 1000;
const MAX_DATA_POINTS = 60;   // Límitar nº puntos del gráfico para mejor rendimiento (ApexLineRT)

// Variables
let lastDate = Date.now();
let interval: ReturnType<typeof setInterval>;

/***** 🗃️ DATA *****/

// Data: SparkLine
const colaProcesamientoData = ref([10, 15, 12, 18, 20, 17, 22, 19, 21, 25]);
const serviciosCaidosData = ref([3, 4, 2, 5, 3, 6, 2, 4, 3, 5]);
const errorsData = ref([2, 3, 1, 4, 2, 5, 3, 2, 6, 4]);

const sparkData1 = ref({
  title: "PROCESAMIENTOS PENDIENTES",
  value: `${colaProcesamientoData.value.at(-1)}`,
  bgColor: "gradient-green",
  textColor: "white",
  iconName: "time-outline",
  chartOptions: {
    chart: {
      id: 'cola-procesamiento',
      type: 'area',
      sparkline: { enabled: true },
      dropShadow: { enabled: true, top: 1, left: 1, blur: 2, opacity: 0.5 }
    },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#ffffff'],
    tooltip: {
      theme: 'dark',
      x: { show: false },
      y: { title: { formatter: () => 'Pendientes' } }
    }
  },
  chartSeries: [{ data: [...colaProcesamientoData.value] }],
});


const sparkData2 = ref({
  title: "SERVICIOS CAÍDOS",
  value: `${serviciosCaidosData.value.at(-1)} servicios`,
  bgColor: "gradient-blue",
  textColor: "white",
  iconName: "server-outline",
  chartOptions: {
    chart: {
      id: 'servicios-caidos',
      type: 'bar',
      sparkline: { enabled: true },
      dropShadow: { enabled: true, top: 1, left: 1, blur: 2, opacity: 0.5 }
    },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#ffffff'],
    tooltip: {
      theme: 'dark',
      x: { show: false },
      y: { title: { formatter: () => 'Servicios' } }
    }
  },
  chartSeries: [{ data: [...serviciosCaidosData.value] }],
});

const sparkData3 = ref({
  title: "ERRORES CRÍTICOS",
  value: `${errorsData.value.at(-1)} errores`,
  bgColor: "gradient-orange",
  textColor: "white",
  iconName: "alert-circle-outline",
  chartOptions: {
    chart: {
      id: 'critical-errors',
      type: 'line',
      sparkline: { enabled: true },
      dropShadow: { enabled: true, top: 1, left: 1, blur: 2, opacity: 0.5 }
    },
    stroke: { curve: 'straight', width: 3 },
    colors: ['#ffffff'],
    tooltip: {
      theme: 'dark',
      x: { show: false },
      y: { title: { formatter: () => 'Errores' } }
    }
  },
  chartSeries: [{ data: [...errorsData.value] }],
});

function updateSparkLines() {
  const MAX_POINTS = 20;

  const getRandom = (base: number, range: number) => {
    return Math.max(0, base + Math.floor(Math.random() * range - range / 2));
  };

  // COLA DE PROCESAMIENTO
  const newCola = getRandom(colaProcesamientoData.value.at(-1) ?? 20, 10);
  colaProcesamientoData.value.push(newCola);
  if (colaProcesamientoData.value.length > MAX_POINTS) colaProcesamientoData.value.shift();
  sparkData1.value.value = `${newCola}`;
  sparkData1.value.chartSeries[0].data = [...colaProcesamientoData.value];


  // SERVICIOS CAÍDOS
  const newServicios = getRandom(serviciosCaidosData.value.at(-1) ?? 3, 3);
  serviciosCaidosData.value.push(newServicios);
  if (serviciosCaidosData.value.length > MAX_POINTS) serviciosCaidosData.value.shift();
  sparkData2.value.value = `${newServicios} servicios`;
  sparkData2.value.chartSeries[0].data = [...serviciosCaidosData.value];

  // ERRORES CRÍTICOS
  const newError = getRandom(errorsData.value.at(-1) ?? 3, 3);
  errorsData.value.push(newError);
  if (errorsData.value.length > MAX_POINTS) errorsData.value.shift();
  sparkData3.value.value = `${newError} errores`;
  sparkData3.value.chartSeries[0].data = [...errorsData.value];
}

onMounted(() => {
  interval = setInterval(() => {
    addDataRealTime();
    updateSparkLines();
  }, UPDATE_INTERVAL);
});

// Data: ApexLineRT - Series
const data = ref<{ x: number; y: number }[]>([]);
const series = ref([{ name: 'Usuarios', data: data.value }]);

/***** 🧠 LÓGICA REALTIME *****/
function addDataRealTime() {

  const newX = lastDate + UPDATE_INTERVAL;
  const newY = Math.floor(Math.random() * 90) + 10;
  data.value.push({ x: newX, y: newY });

  // ApexLineRT - Cuidar uso de memoria
  if (data.value.length > MAX_DATA_POINTS) {
    data.value = data.value.slice(-2);
    series.value = [{ name: 'Usuarios', data: data.value }];
  }

  lastDate = newX;
}

// Data: Echarts - Gauge Simple: Valor inicial para la Red
const currentNetValue = ref(0);

// Data: Echarts - Gauge Múltiple: Valores iniciales
const ringSegments = ref([
  { value: 0, name: 'Descargas', color: '#f97316', min: 0, max: 1000 },
  { value: 0, name: 'Subidas', color: '#10b981', min: 0, max: 300 }
]);

/***** 🧠 LÓGICA REALTIME PARA LA RED *****/
let netTrend = 500;
let uploadTrend = 150;

function simulateVariation(base: number, variation: number, min: number, max: number): number {
  const change = Math.floor(Math.random() * variation * 2) - variation;
  const value = base + change;
  return Math.max(min, Math.min(value, max));
}

function updateNetRealTime() {
  // Simular picos ocasionales
  const spike = Math.random() < 0.05;

  if (spike) {
    netTrend = 900;
    uploadTrend = 280;
  } else {
    // Ajustar tendencia poco a poco
    netTrend = simulateVariation(netTrend, 30, 400, 950);
    uploadTrend = simulateVariation(uploadTrend, 20, 100, 300);
  }

  // Calcular valores finales
  const newDownloadValue = simulateVariation(netTrend, 50, 400, 1000);
  const newUploadValue = simulateVariation(uploadTrend, 30, 100, 300);
  const averageNetValue = Math.floor((newDownloadValue * 0.75 + newUploadValue * 0.25));

  currentNetValue.value = averageNetValue;
  ringSegments.value[0].value = newDownloadValue;
  ringSegments.value[1].value = newUploadValue;
}


/***** 🔄 CICLO DE VIDA *****/
onMounted(() => {
  interval = setInterval(addDataRealTime, UPDATE_INTERVAL);
});
onMounted(() => {
  interval = setInterval(updateNetRealTime, UPDATE_INTERVAL);
});

onUnmounted(() => {
  clearInterval(interval);
});

// ChartJsDoughnut
const cpuUsage = ref(45);
const ramUsage = ref(35);

const doughnutSystemUsage = ref({
  labels: ['CPU Usada', 'RAM Usada', 'Libre'],
  values: [cpuUsage.value, ramUsage.value, 100 - (cpuUsage.value + ramUsage.value)],
  title: 'Uso de CPU y RAM',
  description: 'Porcentaje combinado del sistema'
});

function updateSystemUsage() {
  cpuUsage.value = Math.floor(Math.random() * 40 + 30); // 30–70%
  ramUsage.value = Math.floor(Math.random() * 40 + 20); // 20–60%
  const usedTotal = cpuUsage.value + ramUsage.value;
  const free = Math.max(0, 100 - usedTotal);

  doughnutSystemUsage.value.values = [cpuUsage.value, ramUsage.value, free];
}

onMounted(() => {
  setInterval(updateSystemUsage, 3000);
});


</script>

<style scoped>
ion-row {
  overflow: hidden;
}

ion-col {
  max-height: 100%;
  --ion-grid-column-padding: 10px;
}


.box {
  background: #1E1E1E;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: start;
}

/* Aplicar altura total y por filas, solo en pantallas ≥ lg */
@media (min-width: 992px) {
  ion-grid {
    height: 100%;
  }

  .ion-row-1 {
    height: 20%;
    max-height: 20%;
  }

  .ion-row-2 {
    height: 50%;
    max-height: 50%;
  }

  .ion-row-3 {
    height: 30%;
    max-height: 30%;
  }
}
</style>