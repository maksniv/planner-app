<template>
  <div class="field">
    <input
      type="color"
      class="field__input"
      v-bind="$attrs"
      v-model="localValue"
      :value="localValue"
      @focus="$emit('focus')"
      @input="$emit('update:modelValue', localValue)"
      @blur="$emit('blur', localValue)"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  value?: string;
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
    width: 45px
    height: 45px
    border-radius: $borderRadius
    border: 1px solid $inputBorder
    background-color: $inputBgColor
    transition: .15s ease-out
    outline: none
    &:hover
        border: 1px solid $inputActive
    &:active
        border: 1px solid $inputActive
    &:focus
        box-shadow: 0 0 0 2px $inputActive
    .field__input
        padding: 0
        width: 150%
        height: 150%
        margin: -25%
</style>
