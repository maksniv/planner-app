<template>
  <div class="field">
    <span v-if="labelText" class="field__label">{{ labelText }}</span>
    <input
      class="field__input"
      autocomplete="new-password"
      v-bind="$attrs"
      :placeholder="placeholderText"
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
  placeholderText: string;
  labelText: string;
  value?: string | undefined;
}
const props = defineProps<Props>();

const localValue = ref('');

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'blur', value: string): void;
  (e: 'focus'): void;
}>();

watch(
  props,
  (val) => {
    if (!val.value) return;
    if (!val.modelValue && val.value) {
      localValue.value = val.value;
      emit('update:modelValue', localValue.value);
    }
  },
  // { immediate: true },
);
</script>

<style lang="sass" scoped>
.field
  width: 100%
  position: relative
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  gap: 10px
  .field__input
    padding: 10px 40px 10px 12px
    width: 100%
    height: 100%
    border-radius: $borderRadius
    border: 1px solid $inputBorder
    color: $inputColor
    background-color: $inputBgColor
    transition: .15s ease-out
    outline: none
    &:hover
      border: 1px solid $inputActive
    &:active
      border: 1px solid $inputActive
    &:focus
      box-shadow: 0 0 0 2px $inputActive
</style>
