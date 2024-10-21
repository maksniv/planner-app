<template>
  <div class="calendar">
    <div class="calendar__header">
      <span
        class="date-title"
        @click.capture.stop="showMonthList"
      >
        <span class="date-month">
          {{ month }}
        </span>
        <span class="date-year">
          {{ year }}
        </span>
      </span>
      <div class="month-picker">
        <UIIconButton
          class="month-change"
          icon="fluent:ios-arrow-left-24-filled"
          size="15"
          @click.capture.stop="changeMonthBack"
        />
        <UIIconButton
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
        showTimeSelect()
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
    <TheTimePicker
      :value="localValue"
      :show="isVisibleTimeSelect"
      @time-selected="
        localValue = $event;
        $emit('update:modelValue', localValue)
        $emit('input')
        showTimeSelect()
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
  visible?: boolean;
}
const props = defineProps<Props>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'input'):void
}>()

const localValue = ref<string>(dayjs().startOf('day').toISOString());
const isVisibleMonthList = ref(false);
const isVisibleTimeSelect = ref(false);

const showMonthList = () => {
  isVisibleMonthList.value = !isVisibleMonthList.value;
}
const showTimeSelect = () => {
  isVisibleTimeSelect.value = !isVisibleTimeSelect.value;
};
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

watch(
  () => props.visible,
  (val) => {
    if (val === false) {
      isVisibleMonthList.value = false;
      isVisibleTimeSelect.value = false;
    }
  },
  { immediate: true },
);
</script>

<style lang="sass" scoped>
.calendar 
  height: max-content
  width: 345px
  background-color: var(--main)
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
    color: var(--text)
    padding: 10px 0
    user-select: none
    .date-title
      display: flex
      flex-direction: row
      flex-wrap: nowrap
      gap: 10px
      padding: 5px 10px
      border-radius: var(--border-radius)
      cursor: pointer
      .date-month
        font-size: 23px
        font-weight: 300
        text-transform: capitalize
      .date-year
        font-size: 23px
        font-weight: 400
    .month-picker
      display: flex
      align-items: center
      justify-content: space-between
      cursor: pointer
      .month-change
        width: 35px
        height: 23px
        color: var(--text)
        cursor: pointer
</style>