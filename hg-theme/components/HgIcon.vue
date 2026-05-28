<script setup lang="ts">
import { computed, useAttrs } from 'vue'

const modules = import.meta.glob('../public/icons/*.svg', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const props = withDefaults(defineProps<{
  name: string
  size?: string
  alt?: string
}>(), {
  size: '48px',
})

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const src = computed(() => {
  const match = Object.entries(modules).find(([path]) => path.endsWith(`/${props.name}.svg`))
  return match?.[1]
})

const imgStyle = computed(() => {
  if (attrs.class) {
    return undefined
  }

  return {
    width: props.size,
    height: props.size,
  }
})
</script>

<template>
  <img
    v-if="src"
    :src="src"
    :alt="alt ?? name.replace(/-/g, ' ')"
    class="inline-block object-contain shrink-0"
    :class="attrs.class"
    :style="imgStyle"
  />
</template>
