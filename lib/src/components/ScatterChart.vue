<script lang="ts">
export default {
  name: 'ScatterChart',
};
</script>

<script setup lang="ts">
import { ChartProps } from 'src/types/index';
import BaseChart from './BaseChart.vue';

withDefaults(defineProps<ChartProps<'scatter'>>(), { chartType: 'scatter' });
</script>
<template>
  <base-chart v-bind="{ ...$props, chartData, chartId, chartType: 'scatter', ref: undefined }" />
</template>
