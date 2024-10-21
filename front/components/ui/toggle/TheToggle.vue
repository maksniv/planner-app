<template>
  <label class="field__label">
    <input
        type="checkbox"
        class="field__toggle"
        :checked="modelValue"
        v-bind="$attrs"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).checked);
          $emit('input')"
    >
    <span class="field__icon"/>
    {{label}}
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  label?: string;
}

defineProps<Props>();

defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'input'): void;
}>();
</script>

<style scoped lang="sass">
.field__label
  cursor: pointer
  color: var(--text)
  height: 20px
  max-width: var(--max-width-field)
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  gap: 5px
  justify-content: center
  align-items: center
  .field__toggle
    position: absolute
    width: 1px
    height: 1px
    overflow: hidden
    clip: rect(0, 0, 0, 0)
  .field__icon
    position: relative
    display: inline-block
    background-color: var(--primary)
    border-radius: 100px
    width: 40px
    height: 20px
    z-index: 10
    &:hover
      background-color: var(--primary-hover)
    &::before
      content: ""
      display: inline-block
      position: absolute
      border-radius: 100px
      top: calc(50% - 6px)
      left: 3px
      width: 13px
      height: 12px
      background-color: var(--white)
      transition: all 0.25s ease-in-out
      z-index: 9

.field__toggle:checked + .field__icon
  &::before
    left: calc(100% - 16px)

.field__toggle:disabled + .field__icon
  cursor: default
  border: 2px solid var(--disabled)
  background-color: var(--disabled-text-color)
  &::before
    color: var(--disabled-text-color)

.field__toggle:checked:disabled + .field__icon
  background-color: var(--disabled)
  &::before
    color: var(--disabled-text-color)
    left: calc(100% - 14px)

</style>