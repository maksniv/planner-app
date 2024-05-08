<template>
  <div class="field">
    <span v-if="labelText" class="field__label">{{ labelText }}</span>
    <textarea
      class="field__input"
      ref="textarea"
      autocomplete="new-password"
      v-bind="$attrs"
      :placeholder="placeholderText"
      :value="localValue"
      @focus="$emit('focus')"
      rows="4"
      @input="
        localValue = ($event.target as HTMLInputElement).value.trim();
        $emit('update:modelValue', localValue);
        $emit('input');
      "
      @blur="$emit('blur')"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

interface Props {
  modelValue?: string;
  value?: string;
  type?: string | 'text';
  placeholderText?: string | 'Введите значение...';
  labelText?: string;
}
const props = defineProps<Props>();

const localValue = ref('');
const textarea = ref<HTMLElement | null>(null);

defineEmits<{
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

const resize = (e: Event) => {
  if (e.target) {
    (e.target as HTMLTextAreaElement).style.height = 'auto';
    (e.target as HTMLTextAreaElement).style.height = `${(e.target as HTMLTextAreaElement).scrollHeight}px`;
  }
}

onMounted(() => {
  textarea.value?.addEventListener('keydown', resize);
})

onUnmounted(()=>{
  textarea.value?.removeEventListener('keydown', resize);
})



</script>

<style lang="sass" scoped>
.field
  width: 100%
  position: relative
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  gap: 10px
  .field__label
    color: var(--base-text-color)
  .field__input
    resize: none
    overflow: hidden
    padding: 10px 12px 10px 12px
    width: 100%
    min-height: var(--base-height)
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
