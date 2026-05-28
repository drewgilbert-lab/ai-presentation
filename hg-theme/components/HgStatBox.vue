<script setup lang="ts">
defineProps<{ num: string; label: string }>()
</script>
<template>
  <div class="hg-stat-box">
    <div class="hg-stat-num">{{ num }}</div>
    <div class="hg-stat-label">{{ label }}</div>
  </div>
</template>
