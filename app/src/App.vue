<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { DoughnutChart, LineChart } from '@soulsam480/vue-chart';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import shuffle from 'lodash-es/shuffle';

Chart.register(...registerables);

const dataValues = ref([30, 40, 60, 70, 5]);

const testData = computed<ChartData<'doughnut'>>(() => ({
  labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
  datasets: [
    {
      data: dataValues.value,
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    },
  ],
}));

const options: ChartOptions<'doughnut'> = {
  scales: {
    myScale: {
      type: 'logarithmic',
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const chartRef = ref<Chart<'doughnut'> | null>(null);

const assignRef = () => chartRef;

watch(chartRef, (val) => {
  console.log('From chart ref', val?.data.datasets);
});

function handleChartEvents(instance?: Chart<'doughnut'>) {
  console.log('From chart event handler', instance);
}

const lineData = ref([
  {
    data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
    label: 'Africa',
    borderColor: '#3e95cd',
    fill: false,
  },
  {
    data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
    label: 'Asia',
    borderColor: '#8e5ea2',
    fill: false,
  },
  {
    data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
    label: 'Europe',
    borderColor: '#3cba9f',
    fill: false,
  },
  {
    data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
    label: 'Latin America',
    borderColor: '#e8c3b9',
    fill: false,
  },
  {
    data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
    label: 'North America',
    borderColor: '#c45850',
    fill: false,
  },
]);

const lineDataSet = computed<ChartData<'line'>>(() => ({
  labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
  datasets: lineData.value,
}));

function shuffleData() {
  dataValues.value = shuffle(dataValues.value);
  lineData.value = lineData.value.map((el) => ({
    ...el,
    data: shuffle(el.data),
  }));
}

setInterval(shuffleData, 5000);
</script>

<template>
  <div class="home">
    <div class="home heading">ChartJS 3 on Vue 3</div>

    <a href="https://github.com/soulsam480/vue-chart-3">Repo</a>

    <doughnut-chart
      :chart-ref="assignRef"
      :chart-data="testData"
      :options="options"
      chart-id="some-chart"
      @chart-render="handleChartEvents"
      @chart-update="handleChartEvents"
      @chart-destroy="handleChartEvents"
      @labels-update="handleChartEvents"
    />

    <line-chart
      chart-id="line-chart"
      :options="{
        plugins: {
          title: {
            display: true,
            text: 'World population in millions !',
          },
        },
      }"
      :chart-data="lineDataSet"
      style="height: 600px"
    />
  </div>
</template>

<style>
.home {
  margin: 0 auto;
  width: 700px;
  text-align: center;
}

.home .heading {
  font-size: 50px;
}
</style>
