<template>
  <div class="field">
    <input
      v-bind="$attrs"
      v-model="localValue"
      type="color"
      class="field__input"
      @focus="$emit('focus')"
      @input="$emit('update:modelValue', localValue)"
      @blur="$emit('blur', localValue)"
    >
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  value?: string | '#000000';
}
const props = defineProps<Props>();

const localValue = ref('');

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'blur', value: string): void;
  (e: 'focus'): void;
}>();

watch(
  () => props.value,
  (val) => {
    if (!val) return;
    if (!localValue.value && val) {
      localValue.value = val;
      emit('update:modelValue', localValue.value);
    }
  },
  { immediate: true },
);

watch(
  () => props.modelValue,
  (val) => {
    localValue.value = val;
    emit('update:modelValue', localValue.value);
  },
);
</script>

<style lang="sass" scoped>
.field
    overflow: hidden
    width: 100%
    max-width: 45px
    height: var(--base-height)
    border-radius: var(--border-radius)
    border: 1px solid var(--border-base)
    background-color: var(--background)
    transition: .15s ease-out
    &:hover
        border: 2px solid var(--primary-hover)
    &:active
        border: 2px solid var(--primary)
    &:focus
        box-shadow: 0 0 0 2px var(--primary-focus)
    .field__input
        padding: 0
        width: 150%
        height: 150%
        margin: -25%
</style>
