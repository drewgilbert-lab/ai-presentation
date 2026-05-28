<script setup lang="ts">
import logoWhite from '../public/HGInsights-Logo-white.svg'
</script>
<template>
  <div class="slidev-layout cover bg-hg-navy text-white h-full w-full p-12 flex flex-col justify-center">
    <img :src="logoWhite" class="absolute top-8 left-8 w-[2.5in] object-contain" alt="HG Insights" />
    
    <div class="mt-8">
      <slot />
    </div>
    
    <div class="absolute bottom-6 right-8 text-[14px]">CONFIDENTIAL</div>
  </div>
</template>
