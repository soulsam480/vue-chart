<script lang="ts">
export default {
  name: 'BubbleChart',
};
</script>

<script setup lang="ts">
import { ChartProps } from 'src/types/index';
import BaseChart from './BaseChart.vue';

withDefaults(defineProps<ChartProps<'bubble'>>(), { chartType: 'bubble' });
</script>
<template>
  <base-chart v-bind="{ ...$props, chartData, chartId, chartType: 'bubble', ref: undefined }" />
</template>
