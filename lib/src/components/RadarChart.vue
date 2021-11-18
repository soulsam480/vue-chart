<script lang="ts">
export default {
  name: 'RadarChart',
};
</script>

<script setup lang="ts">
import { ChartProps } from '../types/index';
import BaseChart from './BaseChart.vue';

withDefaults(defineProps<ChartProps<'radar'>>(), { chartType: 'radar' });
</script>
<template>
  <base-chart v-bind="{ ...$props, chartData, chartId, chartType: 'radar', ref: undefined }" />
</template>
