<script setup lang="ts">
import { computed, ref } from 'vue';
import { DoughnutChart } from '@soulsam480/vue-chart';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables);

const dataValues = ref([30, 40, 60, 70, 5]);
const toggleLegend = ref(true);

const testData = computed<ChartData<'doughnut'>>(() => ({
  labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
  datasets: [
    {
      data: dataValues.value,
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    },
  ],
}));

const options = computed<ChartOptions<'doughnut'>>(() => ({
  scales: {
    myScale: {
      type: 'logarithmic',
      position: toggleLegend.value ? 'left' : 'right',
    },
  },
  plugins: {
    legend: {
      position: toggleLegend.value ? 'top' : 'bottom',
    },
    title: {
      display: true,
      text: 'Chart.js Doughnut Chart',
    },
  },
}));
</script>

<template>
  <div class="home">
    <div class="home heading">ChartJS 3 on Vue 3</div>

    <a href="https://github.com/soulsam480/vue-chart-3">Repo</a>

    <doughnut-chart :chart-data="testData" :options="options" chart-id="some-chart" />
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
