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
        localValue = ($event.target as HTMLInputElement).value;
        $emit('update:modelValue', localValue);
        $emit('input');
      "
      @blur="$emit('blur')"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string;
  value?: string;
  type?: string | 'text';
  placeholderText?: string | 'Введите значение...';
  labelText?: string;
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
.field
  width: 100%
  position: relative
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  gap: 10px
  .field__input
    padding: 10px 12px 10px 12px
    width: 100%
    height: $baseHeight
    border-radius: $borderRadius
    border: 1px solid $inputBorder
    color: $inputColor
    background-color: $inputBgColor
    transition: .15s ease-out
    outline: none
    &::placeholder
      color: $secondaryTextColor
    &:hover
      border: 1px solid $inputActive
    &:active
      border: 1px solid $inputActive
    &:focus
      box-shadow: 0 0 0 2px $inputActive
</style>
