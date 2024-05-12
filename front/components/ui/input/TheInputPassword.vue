<template>
  <div class="wrapper">
    <TheInput
      :value="value"
      v-model="localValue"
      :placeholder-text="placeholderText"
      :label-text="labelText"
      :type="typeInput"
      @input="$emit('input')"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
      @update:model-value="$emit('update:modelValue', localValue)"
    />
    <Icon
      v-if="flagVisible"
      name="solar:eye-bold"
      size="25"
      class="wrapper__icon"
      @click="toggleVisiblePassword()"
    />
    <Icon
      v-if="!flagVisible"
      name="ph:eye-closed-bold"
      size="25"
      class="wrapper__icon"
      @click="toggleVisiblePassword()"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  placeholderText?: string | 'Введите пароль...';
  labelText?: string;
  value?: string;
}
defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'input'): void;
  (e: 'blur'): void;
  (e: 'focus'): void;
}>();

const localValue = ref('');

const flagVisible = ref(false);

const toggleVisiblePassword = () => {
  flagVisible.value = !flagVisible.value;
};

const typeInput = computed(() => {
  return flagVisible.value ? 'text' : 'password';
});
</script>

<style lang="sass" scoped>
.wrapper
  position: relative
  width: 100%
  max-width: var(--max-width-field)
  :deep(.field__input)
    padding: 10px 45px 10px 12px
  .wrapper__icon
    cursor: pointer
    position: absolute
    right: 10px
    bottom: calc(var(--base-height)/2 - 13px)
</style>
