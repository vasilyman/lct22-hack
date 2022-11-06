<template>
  <div>
    <canvas 
      ref="chart"
      width="400"
      height="100"
    />
  </div>
</template>
<script lang='ts' setup>
import { Chart, ChartData, ChartOptions, ChartConfiguration } from "chart.js";
import '@/utils/dayjs-chartadapter';

import {
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

const chart = ref<HTMLCanvasElement | null>(null);

const labels = [
  Date.parse('2022-06-01'),
  Date.parse('2022-06-15'),
  Date.parse('2022-07-01'),
  Date.parse('2022-08-01'),
  Date.parse('2022-08-15'),
  Date.parse('2022-09-01'),
  Date.parse('2022-09-10'),
  Date.parse('2022-10-01')
];

const data: ChartData<'line' | 'bubble'> = {
  labels: labels,
  datasets: [
    {
      type: 'line',
      label: 'Динамиика активности',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [
        { x: Date.parse('2022-06-01'), y: 50 },
        { x: Date.parse('2022-07-21'), y: 20 },
        { x: Date.parse('2022-08-01'), y: 50 },
        { x: Date.parse('2022-09-10'), y: 15 },
        { x: Date.parse('2022-10-11'), y: 18 }
      ],
    },
  ]
};

const options: ChartOptions<'line'> = {
  scales: {
    x: {
      type: 'time',
      time: {
        tooltipFormat: 'DD MMM YYYY',
        unit: 'month'
      },
      ticks: {
        source: 'labels',
        callback(value, index, ticks) {
          let text = value;
          switch (ticks[index].value) {
            case Date.parse('2022-06-15'):
              text = 'Старт проекта';
              break;
            case Date.parse('2022-08-15'):
              text = 'Команда собрана';
              break;
            case Date.parse('2022-09-10'):
              text = 'Статус инновационный';
              break;
            default:
              break;
          }
          return text;
        },
      },
      grid: {
        color(context) {
          let color = '#555';
          if ([Date.parse('2022-06-15'), Date.parse('2022-08-15'), Date.parse('2022-09-10')].includes(context.tick.value)) {
            color = '#0f0';
          }
          return color;
        },
      }
    }
  }
};

const config: ChartConfiguration = {
  type: 'line',
  data,
  options
};

onMounted(() => {
  nextTick(() => {
    const ctx = chart.value as HTMLCanvasElement;
    const mixedChart = new Chart(ctx, config);
  })
  
});
</script>
