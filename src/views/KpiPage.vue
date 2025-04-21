<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>🎯 KPIs</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">🎯 KPIs</ion-title>
        </ion-toolbar>
      </ion-header>

      <h1 class="ion-padding">🚀 KPIs de Negocio</h1>
      <ion-accordion-group expand="inset" :multiple="true">
        <ion-accordion v-for="item in smartGoals" :key="item.id" :value="item.id.toString()">
          <ion-item slot="header">
            <ion-label>{{ item.id }}. {{ item.title }}</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <p>{{ item.description }}</p>
            <ion-list :inset="true">
              <ion-item v-for="(element, index) in item.smart" :key="index">
                <ion-label><b>{{ element.letter }}</b> → {{ element.content }}</ion-label>
              </ion-item>
            </ion-list>
          </div>
        </ion-accordion>
      </ion-accordion-group>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonList } from '@ionic/vue';
import { ref } from 'vue';

interface SmartElement {
  letter: string;
  content: string;
}

interface SmartGoal {
  id: number;
  title: string;
  description: string;
  smart: SmartElement[];
}

// KPIs SMART adaptados a tus gráficos y app de ventas
const smartGoals = ref<SmartGoal[]>([
  {
    id: 1,
    title: "Incrementar Ventas Mensuales (SparkLine / ApexMixedChart)",
    description: "Incrementar las ventas mensuales en un 30% durante los próximos 3 meses mediante campañas de email marketing y promociones en fechas clave.",
    smart: [
      { letter: "S", content: "Incrementar las ventas mensuales" },
      { letter: "M", content: "30% en 3 meses" },
      { letter: "A", content: "con campañas de email marketing y promociones" },
      { letter: "R", content: "para mejorar ingresos y conversión" },
      { letter: "T", content: "durante los próximos 3 meses" }
    ]
  },
  {
    id: 2,
    title: "Aumentar Retención de Usuarios (ApexMixedChart)",
    description: "Aumentar la tasa de retención de usuarios del 40% al 60% en los próximos 6 meses mediante mejoras en la experiencia de usuario y soporte postventa.",
    smart: [
      { letter: "S", content: "Aumentar la tasa de retención de usuarios" },
      { letter: "M", content: "del 40% al 60%" },
      { letter: "A", content: "mejorando UX y soporte postventa" },
      { letter: "R", content: "para mantener clientes activos y fieles" },
      { letter: "T", content: "en 6 meses" }
    ]
  },
  {
    id: 3,
    title: "Alcanzar Objetivo de Ventas Trimestral (Gauge)",
    description: "Alcanzar el 100% del objetivo de ventas trimestral (50,000€) mediante una estrategia de upselling y campañas en redes sociales.",
    smart: [
      { letter: "S", content: "Alcanzar el objetivo de ventas trimestral" },
      { letter: "M", content: "50,000€ (100%)" },
      { letter: "A", content: "con upselling y campañas sociales" },
      { letter: "R", content: "para cumplir metas financieras del trimestre" },
      { letter: "T", content: "al finalizar el trimestre actual" }
    ]
  },
  {
    id: 4,
    title: "Expandir Descargas Internacionales (EchartsMap)",
    description: "Aumentar las descargas internacionales en un 40% en los próximos 4 meses, con campañas localizadas para los países de habla inglesa y portuguesa.",
    smart: [
      { letter: "S", content: "Aumentar las descargas internacionales" },
      { letter: "M", content: "40% en 4 meses" },
      { letter: "A", content: "con campañas localizadas en inglés y portugués" },
      { letter: "R", content: "para mejorar la presencia global" },
      { letter: "T", content: "durante los próximos 4 meses" }
    ]
  },
  {
    id: 5,
    title: "Concentrar Descargas en 5 Países Clave (Doughnut)",
    description: "Lograr que el 70% de las descargas provengan de nuestros 5 mercados objetivo en los próximos 60 días a través de estrategias geolocalizadas de publicidad.",
    smart: [
      { letter: "S", content: "Lograr que el 70% de las descargas provengan de 5 países clave" },
      { letter: "M", content: "70% en 60 días" },
      { letter: "A", content: "con publicidad geolocalizada" },
      { letter: "R", content: "para consolidar mercados rentables" },
      { letter: "T", content: "en los próximos 60 días" }
    ]
  }
]);
</script>
