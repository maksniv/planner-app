<template>
  <div
    class="wrapper"
    @click="toggleVisible"
    v-click-outside="clickOutside"
  >
    <TheInput
      :value="visibleLocalValue"
      v-model="visibleLocalValue"
      :placeholder-text="placeholderText"
      :label-text="labelText"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
      @input="updateLocalValue()"
    />
    <Icon
      name="bx:calendar"
      size="25"
      class="wrapper__icon"
    />
    <div class="calendar__wrapper">
      <TheCalendar
        v-show="isVisible"
        :value="localValue"
        v-model="localValue"
        @input="
          updateVisibleLocalValue()
          $emit('update:modelValue', localValue);
          $emit('input');
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

interface Props {
  modelValue: string;
  placeholderText?: string | 'Выберите дату';
  labelText?: string;
  value?: string;
}
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'input'): void;
  (e: 'blur'): void;
  (e: 'focus'): void;
}>();

const visibleLocalValue = ref('');
const localValue = ref('');
const isVisible = ref(false);

const formatValue = (val: string) => {
  return dayjs(val).format('DD.MM.YYYY')
}

watch(
  () => props.value,
  (val) => {
    if (!val) return;
    if (!localValue.value && val) {
      localValue.value = val;
      visibleLocalValue.value = formatValue(val);
    }
  },
  { immediate: true },
);

watch(
  () => props.modelValue,
  (val) => {
    if (!val) return;
    localValue.value = val
    visibleLocalValue.value = formatValue(val);
  },
);

const updateVisibleLocalValue = () => {
  visibleLocalValue.value = formatValue(localValue.value);
}

const updateLocalValue = () => {
  if(visibleLocalValue.value.length === 10) {
    if (!dayjs(visibleLocalValue.value).isValid()) return;
    const [day, month, year] = visibleLocalValue.value.split('.').map(Number);
    localValue.value = dayjs(visibleLocalValue.value).date(day).month(month - 1).year(year).toISOString();
    emit('update:modelValue', localValue.value);
    emit('input')
  }
}

const clickOutside = () => {
  isVisible.value = false;
}
const toggleVisible = () => {
  isVisible.value = !isVisible.value;
}
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
    right: 17px
    bottom: calc(var(--base-height)/2 - 13px)
  .calendar__wrapper
    position: absolute
    top: 80px
    z-index: var(--z-dropdown)
    right: 0
</style>
