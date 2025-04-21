<template>
    <VEChart class="gauge-ring-chart" :option="chartOptions" autoresize  />
  </template>
  
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { use } from 'echarts/core';
  import { GaugeChart } from 'echarts/charts';
  import { CanvasRenderer } from 'echarts/renderers';
  import { TooltipComponent, TitleComponent } from 'echarts/components';
  import VEChart from 'vue-echarts';
  
  
  use([GaugeChart, CanvasRenderer, TooltipComponent, TitleComponent]);
  
  
  // Props ✨
  const props = withDefaults(
    defineProps<{
      segments: {
        value: number;
        name?: string;
        color?: string;
      }[];
    }>(),
    {
      segments: () => [
        { value: 50, name: 'Segmento 1', color: '#3b82f6' },
        { value: 70, name: 'Segmento 2', color: '#10b981' }
      ]
    }
  );
  
  
  // Configuración del gráfico
  const chartOptions = computed(() => ({
    title: {
      text: 'Procedencia',
      padding: 20,
      textStyle:{
        color: '#8C8C8C',
        fontWeight: 'bolder',
        fontSize: 16,
      },
    },
    series: [{
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      pointer: { show: false },
     
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {
          borderWidth: 1,
          borderColor: '#464646',
        }
      },
      axisLine: {
        lineStyle: {
          width: 20,
          color: [[1, '#2d3748']]
        }
      },
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      title: {
        fontSize: 14,
        color: '#8C8C8C',
      },
      detail: {
        width: 50,
        height: 14,
        fontSize: 16,
        color: 'inherit',
        borderColor: 'inherit',
        borderRadius: 20,
        borderWidth: 1,
        formatter: '{value} %'
      },
      data: props.segments.map((s, i) => {
        // Calcular posición para distribución uniforme
        const totalSegments = props.segments.length;
        const verticalOffset = totalSegments > 1 ? -40 + (i * 80 / (totalSegments - 1)) : 0;
       
        return {
          value: s.value,
          name: s.name || `Segmento ${i + 1}`,
          title: {
            offsetCenter: ['0%', `${verticalOffset - 10}%`]
          },
          detail: {
            offsetCenter: ['0%', `${verticalOffset + 15}%`],
            color: '#ffffff'
          },
          itemStyle: {
            color: s.color ?? '#4caf50'
          }
        };
      })
    }]
  }));
  </script>
  
  
  <style scoped>
  .gauge-ring-chart {
    min-height: 260px;
    width: 100%;
  }
  </style>
  