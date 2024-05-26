<template>
  <div class="calendar">
    <div class="calendar__header">
      <span
        class="month-title"
        @click.capture.stop="showMonthList"
      >
        {{ month }}
      </span>
      <div class="month-picker">
        <TheIconButton
          class="month-change"
          icon="fluent:ios-arrow-left-24-filled"
          size="15"
          @click.capture.stop="changeMonthBack"
        />
        <span
          class="year-picker">
            {{ year }}
        </span>
        <TheIconButton
          class="month-change"
          icon="fluent:ios-arrow-right-24-filled"
          size="15"
          @click.capture.stop="changeMonthUp"
        />
      </div>
    </div>
    <TheDayPicker
      :value="localValue"
      @day-selected="
        localValue = $event;
        $emit('update:modelValue', localValue)
        $emit('input');
      "
    />
    <TheMonthPicker
      :value="localValue"
      :show="isVisibleMonthList"
      @month-selected="
        localValue = $event;
        showMonthList();
      "
    />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');
interface Props {
  value?: string;
  modelValue?: string;
}
const props = defineProps<Props>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'input'):void
}>()

const localValue = ref<string>(dayjs().format('DD.MM.YYYY'));
const isVisibleMonthList = ref(false);

const showMonthList = () => {
  isVisibleMonthList.value = !isVisibleMonthList.value;
}
const month = computed(() => {
  return dayjs(localValue.value).format('MMMM')
});
const year = computed(() => {
  return dayjs(localValue.value).format('YYYY')
});

const changeMonthUp = () => {
  localValue.value = dayjs(localValue.value).add(1, 'month').toISOString()
}
const changeMonthBack = () => {
  localValue.value = dayjs(localValue.value).subtract(1, 'month').toISOString()
}

watch(
  () => props.value,
  (val) => {
    if (!val) return;
    if (!dayjs(val).isValid()) return;
    localValue.value = val;
  },
  { immediate: true },
);

watch(
  () => props.modelValue,
  (val) => {
    if (!val) return;
    if (!dayjs(val).isValid()) return;
    localValue.value = val;
  },
  { immediate: true },
);
</script>

<style lang="sass" scoped>
.calendar 
  height: max-content
  width: 345px
  background-color: var(--sidebar)
  border: 1px solid var(--border-base)
  border-radius: var(--border-radius)
  padding: 20px
  position: relative
  overflow: hidden
  box-shadow: 0 4px 6px var(--box-shadow)
  .calendar__header
    display: flex
    justify-content: space-between
    align-items: center
    font-size: 25px
    font-weight: 600
    color: var(--base-text-color)
    padding: 10px
    user-select: none
    .month-title
      padding: 5px 10px
      font-size: 23px
      font-weight: 300
      text-transform: capitalize
      border-radius: 10px
      cursor: pointer
    .month-picker
      display: flex
      align-items: center
      justify-content: space-between
      cursor: pointer
      .month-change
        width: 35px
        height: 23px
        color: var(--base-text-color)
        cursor: pointer
      .year-picker
        font-size: 18px
        font-weight: 300
        min-width: 84px
        text-align: center
        user-select: none
</style>