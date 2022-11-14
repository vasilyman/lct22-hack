<template>
  <div>
    <canvas 
      ref="chart"
      width="400"
      height="100"
      class=""
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
        { x: Date.parse('2022-06-01'), y: 10 },
        { x: Date.parse('2022-07-21'), y: 112 },
        { x: Date.parse('2022-08-01'), y: 170 },
        { x: Date.parse('2022-09-10'), y: 210 },
        { x: Date.parse('2022-10-11'), y: 225 }
      ],
    },
  ]
};

const screenWidth = ref(0);

const animId  = ref(0);

const getWidth = () => {
  screenWidth.value = window.innerWidth;
};

const start = () => {
  getWidth();
  animId.value = requestAnimationFrame(start)
};

const stop = () => {
  cancelAnimationFrame(animId.value);
};

const options: ChartOptions<'line'> = {
  responsive: true,
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

let mixedChart: Chart;

const updateConfigAsNewObject = (chart: Chart) => {
    chart.options = {
      ...options,
      aspectRatio: screenWidth.value > 700 ? 3 : 1.5,
    };
    chart.update();
};

watch(screenWidth, () => {
  if (mixedChart instanceof Chart) {
    console.log('draw');
    updateConfigAsNewObject(mixedChart);
  }
});

onMounted(() => {
  start();
  nextTick(() => {
    mixedChart = new Chart(chart.value as HTMLCanvasElement, config);
    updateConfigAsNewObject(mixedChart);
  });
});

onUnmounted(() => {
  stop();
});
</script>
<style lang="postcss">
</style>
