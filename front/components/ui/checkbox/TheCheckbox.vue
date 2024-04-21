<template>
  <label class="field__label">
    <input
        type="checkbox"
        class="field__checkbox"
        :checked="modelValue"
        @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).checked);
        $emit('input')"
        v-bind="$attrs"
    />
    <span class="field__icon"></span>
    {{label}}
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  label: string;
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
  color: var(--base-text-color)
  .field__checkbox
    position: absolute
    -webkit-appearance: none
    -moz-appearance: none
    appearance: none
  .field__icon
    position: relative
    display: inline-block
    width: 20px
    height: 20px
    border-radius: calc( var(--border-radius) / 2)
    border: 2px solid var(--border-base)
    color: var(--base-text-color)
    background-color: var(--background)
    vertical-align: sub
    margin-right: 5px
    transition: all 0.15s ease
    z-index: 10
    &::after
      transition: all 0.15s ease
    &::before
      content: ""
      display: inline-block
      position: absolute
      top: 1px
      right: 5px
      width: 6px
      height: 11px
      border-right: 2px solid var(--base-text-color)
      border-bottom: 2px solid var(--base-text-color)
      transform: rotate(45deg) scale(0)
      transition: transform 0.15s ease
      z-index: 10
    &:hover
      &::after
        content: ""
        height: 250%
        width: 250%
        background-color: var(--border-base)
        border-radius: 100px
        display: inline-block
        left: -75%
        top: -75%
        position: absolute
        z-index: 9
    &:active
      &::after
        content: ""
        height: 250%
        width: 250%
        background-color: var(--box-shadow)
        border-radius: 100px
        display: inline-block
        left: -75%
        top: -75%
        position: absolute
        z-index: 9

.field__checkbox:checked + .field__icon
  background-color: var(--primary)
  &::before
    transform: rotate(45deg) scale(1)

.field__checkbox:focus + .field__icon
  width: 20px
  height: 20px
  box-shadow: 0 0 0 2px var(--primary-focus)
</style>