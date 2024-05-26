<template>
  <div class="field">
    <span v-if="labelText" class="field__label">{{ labelText }}</span>
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
        $emit('input', localValue);
      "
      @blur="$emit('blur')"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | null;
  value?: string | null;
  type?: string | 'text';
  placeholderText?: string | 'Введите значение...';
  labelText?: string;
}
const props = defineProps<Props>();

const localValue = ref<null | string | undefined>(null);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void;
  (e: 'input', value: string): void;
  (e: 'blur'): void;
  (e: 'focus'): void;
}>();

watch(
  () => props.value,
  (val) => {
    localValue.value = val;
  },
  { immediate: true },
);

watch(
  () => props.modelValue,
  (val) => {
    localValue.value = val;
  },
);
</script>

<style lang="sass" scoped>
.field
  width: 100%
  max-width: var(--max-width-field)
  position: relative
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  gap: 10px
  .field__label
    color: var(--base-text-color)
  .field__input
    padding: 10px 12px 10px 12px
    width: 100%
    height: var(--base-height)
    border-radius: var(--border-radius)
    border: 1px solid var(--border-base)
    color: var(--base-text-color)
    background-color: var(--background)
    transition: color .15s, border .15s ease-out
    &::placeholder
      color: var(--secondary-text-color)
    &:hover
      border: 1px solid var(--primary-hover)
    &:active
      border: 1px solid var(--primary)
    &:focus
      box-shadow: 0 0 0 2px var(--primary-focus)
</style>
