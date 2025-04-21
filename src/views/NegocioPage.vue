<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>🚀 Negocio</ion-title>
      </ion-toolbar>
    </ion-header>


    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">🚀 Negocio</ion-title>
        </ion-toolbar>
      </ion-header>


      <!-- Grid principal del Dashboard -->
      <ion-grid class="dashboard-grid">
        <!-- 🟢 Fila 1: 4 Columnas -->
        <ion-row class="ion-row-1">
          <ion-col size="6" size-lg="3">
            <div class="box">
              <spark-line v-bind="sparkData1"/>
            </div>
          </ion-col>
          <ion-col size="6" size-lg="3">
            <div class="box">
              <spark-line v-bind="sparkData2"/>
            </div>
          </ion-col>
          <ion-col size="6" size-lg="3">
            <div class="box">
              <spark-line v-bind="sparkData3"/>
            </div>
          </ion-col>
          <ion-col size="6" size-lg="3">
            <div class="box">
              <spark-line v-bind="sparkData4"/></div>
          </ion-col>
        </ion-row>


        <!-- 🔵 Fila 2: 2 Columnas -->
        <ion-row class="ion-row-2">
          <ion-col size="12" size-lg="9">
            <ApexMixedChart :series="dataMixedChartSeries" />
          </ion-col>
          <ion-col size="12" size-lg="3">
            <EchartsGauge :value=dataGauge title="OBJETIVO VENTAS" />
          </ion-col>
        </ion-row>


        <!-- 🟠 Fila 3: 2 Columnas -->
        <ion-row class="ion-row-3">
          <ion-col size="12" size-lg="6">
            <div class="box">
              <EchartsMap  :data=dataDownloadsWorld title="Descargas " subtitle="KPI: 20 Países > 5K" />
            </div>
          </ion-col>
          <ion-col size="12" size-lg="6">
            <div class="box">
              <!-- <DangerousGoose :percent="percent" label="Países > 5K" /> -->
                <ChartJsDoughnut :labels="doughnutLabels" :values="doughnutValues" title="Descargas Top 5 Países" description="Reparto de descargas entre los 5 primeros países y el resto"/>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { ref, computed } from 'vue';
import SparkLine from '@/components/SparkLine.vue';
import ApexMixedChart from '@/components/ApexMixedChart.vue';
import EchartsGauge from '@/components/EchartsGauge.vue';
import EchartsMap from '@/components/EchartsMap.vue';
import ChartJsDoughnut from '@/components/ChartJsDoughnut.vue';

// 🌎 Data: EchartsMao - GEOMAPS
const dataDownloadsWorld = ref([
  { name: "United States of America", value: 18000 },
  { name: "China", value: 17000 },
  { name: "India", value: 16000 },
  { name: "Brazil", value: 14000 },
  { name: "Russia", value: 13000 },
  { name: "Germany", value: 15000 },
  { name: "France", value: 12000 },
  { name: "United Kingdom", value: 11000 },
  { name: "Japan", value: 12500 },
  { name: "Canada", value: 9500 },
  { name: "Italy", value: 9000 },
  { name: "South Korea", value: 8700 },
  { name: "Mexico", value: 7800 },
  { name: "Indonesia", value: 7200 },
  { name: "Spain", value: 7000 },
  { name: "Australia", value: 6800 },
  { name: "Turkey", value: 6400 },
  { name: "Saudi Arabia", value: 6000 },
  { name: "South Africa", value: 5800 },
  { name: "Argentina", value: 5400 },
  { name: "Poland", value: 5000 },
  { name: "Netherlands", value: 4700 },
  { name: "Sweden", value: 4500 },
  { name: "Switzerland", value: 4300 },
  { name: "Portugal", value: 4000 },
  { name: "Vietnam", value: 3800 },
  { name: "Nigeria", value: 3600 },
  { name: "Egypt", value: 3400 },
  { name: "Pakistan", value: 3200 },
  { name: "Ukraine", value: 3000 },
  { name: "Uruguay", value: 2800 },
]);

// 🧭 Data: EchartsGauge
const dataGauge = ref(90);

// 📊 Data: ApexMixedChart
const dataMixedChartSeries = ref([
  {
    name: 'Ventas',
    type: 'column',
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 25,]
  },
  {
    name: 'Tráfico',
    type: 'area',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 50,]
  },
  {
    name: 'Retención',
    type: 'line',
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 42,]
  }
]);

// Data: ChartJsDoughnut

// Computados para top 5 + “Otros”
const sorted = computed(() =>
  [...dataDownloadsWorld.value].sort((a, b) => b.value - a.value)
);
const top5 = computed(() => sorted.value.slice(0, 5));
const others = computed(() =>
  sorted.value.slice(5).reduce((sum, c) => sum + c.value, 0)
);

const doughnutLabels = computed(() =>
  top5.value.map(c => c.name).concat('Otros')
);
const doughnutValues = computed(() =>
  top5.value.map(c => c.value).concat(others.value)
);

// Data: spark-line

const sparkData1 = ref({
  title: "USUARIOS ACTIVOS",
  value: "92000",
  bgColor: "gradient-blue",
  textColor: "white",
  iconName: "person-outline",
  chartOptions: {
    chart: {
      id: 'usuarios-activos',
      type: 'area',
      sparkline: { enabled: true },
      dropShadow: { enabled: true, top: 1, left: 1, blur: 2, opacity: 0.5 }
    },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#fff'],
    tooltip: { theme: 'dark', x: { show: false }, y: { title: { formatter: () => '' } } }
  },
  chartSeries: [{ data: [5400, 6000, 7200, 7800, 8500, 9000, 9500, 9700, 9900, 10200] }],
});

const sparkData2 = ref({
  title: "VENTAS",
  value: "15000",
  bgColor: "gradient-green",
  textColor: "white",
  iconName: "cash-outline",
  chartOptions: {
    chart: {
      id: 'ventas',
      type: 'bar',
      sparkline: { enabled: true },
      dropShadow: { enabled: true, top: 1, left: 1, blur: 2, opacity: 0.5 }
    },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#fff'],
    tooltip: { theme: 'dark', x: { show: false }, y: { title: { formatter: () => '' } } }
  },
  chartSeries: [{ data: [13000, 15000, 12000, 11000, 12500, 14000, 9500, 10000, 11500, 10500] }],
});

const sparkData3 = ref({
  title: "NUEVOS USUARIOS",
  value: "8700",
  bgColor: "gradient-orange",
  textColor: "white",
  iconName: "person-add-outline",
  chartOptions: {
    chart: {
      id: 'usuarios-nuevos',
      type: 'line',
      sparkline: { enabled: true },
      dropShadow: { enabled: true, top: 1, left: 1, blur: 2, opacity: 0.5 }
    },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#fff'],
    tooltip: { theme: 'dark', x: { show: false }, y: { title: { formatter: () => '' } } }
  },
  chartSeries: [{ data: [8700, 7800, 9500, 7000, 8500, 9000, 10000, 9200, 11000, 10500] }],
});

const sparkData4 = ref({
  title: "TIEMPO EN APP",
  value: "52 min",
  bgColor: "gradient-purple",
  textColor: "white",
  iconName: "time-outline",
  chartOptions: {
    chart: {
      id: 'tiempo-usuario',
      type: 'scatter',
      sparkline: { enabled: true },
      dropShadow: { enabled: true, top: 1, left: 1, blur: 2, opacity: 0.5 }
    },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#fff'],
    tooltip: { theme: 'dark', x: { show: false }, y: { title: { formatter: () => '' } } }
  },
  chartSeries: [{ data: [40, 45, 47, 48, 50, 52, 55, 53, 54, 52] }],
});


// Tiempo real
// Simular cambios en tiempo real (cada 2 segundos)
setInterval(() => {
  // Valor aleatorio entre 60 y 100 (por ejemplo)
  dataGauge.value = Math.floor(60 + Math.random() * 40);
}, 2000);

// // SparkLines
// function updateSparkData(sparkRef: any) {
//   const newData = [...sparkRef.value.chartSeries[0].data];
//   newData.shift(); // elimina el primer elemento
//   newData.push(Math.floor(Math.random() * 5000) + 5000); // añade uno nuevo
//   sparkRef.value.chartSeries[0].data = newData;
// }

// setInterval(() => {
//   updateSparkData(sparkData1);
//   updateSparkData(sparkData2);
//   updateSparkData(sparkData3);
//   updateSparkData(sparkData4);
// }, 2000);

// // ApexMixedChart
// function updateMixedChartData() {
//   dataMixedChartSeries.value.forEach((serie) => {
//     const newData = [...serie.data];
//     newData.shift();
//     newData.push(Math.floor(Math.random() * 50) + 20);
//     serie.data = newData;
//   });
// }
// setInterval(updateMixedChartData, 3000);

// // EchartsMap
// setInterval(() => {
//   dataDownloadsWorld.value.forEach(country => {
//     const fluctuation = Math.floor(Math.random() * 1000) - 500; // +/-500
//     country.value = Math.max(1000, country.value + fluctuation);
//   });
// }, 5000);


</script>


<style scoped>
ion-row {
  overflow: hidden;
}


ion-col {
  max-height: 100%;
  --ion-grid-column-padding: 10px;
}


/* El contenido real de cada columna */
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


/* Aplicar altura total y por filas, solo en pantallas ≥ md */
@media (min-width: 992px) {
  ion-grid {
    height: 100%;
  }

  .ion-row-1 {
    height: 20%;
    max-height: 20%;
  }

  .ion-row-2 {
    height: 40%;
    max-height: 40%;
  }

  .ion-row-3 {
    height: 40%;
    max-height: 40%;
  }
}

ion-row{
  overflow: hidden;
  /*border: 1px solid red;*/
}


ion-col {
  max-height: 100%;
  --ion-grid-column-padding:10px;
  /*background-color: blue;*/
}


/* El contenido real de cada columna */
.box {
  background: #1E1E1E;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  border-radius:5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


/* Aplicar altura total y por filas, solo en pantallas ≥ md */
@media (min-width: 992px) {  
  ion-grid{height: 100%;}
  .ion-row-1{height: 20%; max-height: 20%;}
  .ion-row-2{height: 40%; max-height: 40%;}
  .ion-row-3{height: 40%; max-height: 40%;}
}

</style>