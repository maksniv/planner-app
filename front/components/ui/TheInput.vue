<template>
  <div class="field">
    <span v-if="labelText" class="field__label">{{ labelText }}</span>
    <input
      class="field__input"
      v-bind="$attrs"
      :placeholder="placeholderText"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholderText: {
    type: String,
    default: 'Поле...',
  },
  labelText: {
    type: String,
    default: '',
  },
});
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
