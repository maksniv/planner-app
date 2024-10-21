<template>
  <div class="wrapper">
    <UIInput
      v-model="localValue"
      :value="value"
      :placeholder-text="placeholderText"
      :label-text="labelText"
      @input="$emit('input', localValue);"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
      @update:model-value="$emit('update:modelValue', localValue)"
    />
    <Icon
      name="tabler:search"
      size="19"
      class="wrapper__icon-search"
    />
    <UIIconButton
      v-if="localValue"
      class="wrapper__icon-clear-value"
      icon="mdi:clear-bold"
      size="20"
      @click="clearValue"
    />
  </div>
</template>

<script setup lang="ts">

import { defineProps } from 'vue';

const props = defineProps({
  modelValue: {
    type: String || null,
    default: null
  },
  value: {
    type: String || null,
    default: null
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholderText: {
    type: String,
    default: 'Введите значение...'
  },
  labelText: {
    type: String,
    default: ''
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'input', value: string): void;
  (e: 'blur'): void;
  (e: 'focus'): void;
}>();

const localValue = ref('');

const clearValue = () => {
  localValue.value = '';
  emit('update:modelValue', localValue.value);
  emit('input', localValue.value);
}
</script>

<style lang="sass" scoped>
.wrapper
  position: relative
  width: 100%
  max-width: var(--max-width-field)
  :deep(.field__input)
    padding: 10px 55px 10px 35px
  .wrapper__icon-search
    position: absolute
    left: 10px
    color: var(--text-secondary)
    bottom: calc(var(--base-height)/2 - 9px)
  .wrapper__icon-clear-value
    cursor: pointer
    position: absolute
    right: 10px
    color: var(--text)
    bottom: calc(var(--base-height)/2 - 10px)
</style>
