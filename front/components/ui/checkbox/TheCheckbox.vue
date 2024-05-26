<template>
  <label class="field__label">
    <input
      type="checkbox"
      class="field__checkbox"
      :checked="localValue"
      @input="
        localValue = ($event.target as HTMLInputElement).checked;
        $emit('update:modelValue', localValue);
        $emit('input')
       "
      v-bind="$attrs"
    />
    <span class="field__icon"></span>
      {{label}}
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: boolean;
  value?: boolean;
  label?: string;
}

const props = defineProps<Props>();

const localValue = ref(false);

defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'input'): void;
  (e: 'blur'): void;
  (e: 'focus'): void;
}>();

watch(
  () => props.value,
  (val) => {
    if (!val) return;
    if (!localValue.value && val) {
      localValue.value = val;
    }
  },
  { immediate: true },
);

watch(
  () => props.modelValue,
  (val) => {
    if (!val) return;
    localValue.value = val;
  },
);
</script>

<style scoped lang="sass">
.field__label
  cursor: pointer
  height: 20px
  color: var(--base-text-color)
  max-width: var(--max-width-field)
  width: fit-content
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  //gap: 5px
  justify-content: center
  align-items: center
  .field__checkbox
    //position: absolute
    appearance: none
    -webkit-appearance: none
    width: 1px
    height: 1px
    overflow: hidden
    clip: rect(0, 0, 0, 0)
  .field__icon
    position: relative
    display: inline-block
    width: 20px
    height: 20px
    border-radius: calc( var(--border-radius) / 2)
    border: 2px solid var(--border-base)
    color: var(--base-text-color)
    background-color: var(--background)
    transition: color .15s, border .15s ease
    z-index: 10
    margin-right: 5px
    &::after
      transition: color .15s, border .15s ease
    &::before
      content: ""
      display: inline-block
      position: absolute
      top: 1px
      right: 5px
      width: 6px
      height: 11px
      border-right: 2px solid var(--white)
      border-bottom: 2px solid var(--white)
      transform: rotate(45deg) scale(0)
      transition: transform 0.15s ease
      z-index: 9
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
        z-index: 8
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
        z-index: 8

.field__checkbox:checked + .field__icon
  background-color: var(--primary)
  &::before
    transform: rotate(45deg) scale(1)

.field__checkbox:focus + .field__icon
  border: 2px solid var(--primary-focus)

.field__checkbox:checked:focus + .field__icon
  border: 2px solid var(--primary-focus)

.field__checkbox:disabled + .field__icon
  cursor: default
  border: 2px solid var(--disabled)
  background-color: var(--disabled-text-color)
  &::before
    transform: rotate(45deg) scale(0)

.field__checkbox:checked:disabled + .field__icon
  background-color: var(--disabled)
  &::before
    color: var(--disabled-text-color)
    transform: rotate(45deg) scale(1)
</style>