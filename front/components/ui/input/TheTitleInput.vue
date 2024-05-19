<template>
  <input
    class="field__input"
    :type="type"
    autocomplete="new-password"
    v-bind="$attrs"
    :placeholder="placeholderText"
    :value="localValue"
    @focus="$emit('focus')"
    @input="
      localValue = ($event.target as HTMLInputElement).value.trim();
       $emit('update:modelValue', localValue);
       $emit('input');
     "
    @blur="$emit('blur')"
    />
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string;
  value?: string;
  type?: string | 'text';
  placeholderText?: string | 'Введите значение...';
}
const props = defineProps<Props>();

const localValue = ref('');

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
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

<style lang="sass" scoped>
.field__input
  width: 100%
  max-width: var(--max-width-field)
  padding: 10px 5px 0 5px
  height: calc(var(--base-height) * 1.20)
  border-bottom: 1px solid var(--border-base)
  font-size: 25px
  color: var(--base-text-color)
  background-color: transparent
  transition: color .15s, border .15s ease-out, background-color 0.15s ease
  &::placeholder
    color: var(--secondary-text-color)
  &:hover
    background-color: var(--background)
    border-bottom: 1px solid var(--primary-hover)
  &:active
    background-color: var(--background)
    border-bottom: 1px solid var(--primary)
  //&:focus
  //  box-shadow: 0 1px 0 2px var(--primary-focus)
</style>
