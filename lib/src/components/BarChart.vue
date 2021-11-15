<script lang="ts">
export default {
  name: 'BarChart',
};
</script>

<script setup lang="ts">
import { ChartProps } from 'src/types/index';
import BaseChart from './BaseChart.vue';

withDefaults(defineProps<ChartProps<'bar'>>(), { chartType: 'bar' });
</script>
<template>
  <base-chart v-bind="{ ...$props, chartData, chartId, chartType: 'bar', ref: undefined }" />
</template>
