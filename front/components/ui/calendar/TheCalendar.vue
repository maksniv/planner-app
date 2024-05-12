<template>
  <div class="calendar">
    <div class="calendar__header">
      <span class="year-picker">{{ year }}</span>
      <div class="month-picker">
        <TheIconButton
          class="month-change"
          icon="fluent:ios-arrow-left-24-filled"
          size="15"
          @click.capture.stop="changeMonthBack"
        />
        <span class="month-title">{{ month }}</span>
        <TheIconButton
          class="month-change"
          icon="fluent:ios-arrow-right-24-filled"
          size="15"
          @click.capture.stop="changeMonthUp"
        />
      </div>
    </div>
    <div class="calendar__body">
      <div class="weeks-header">
        <div class="weeks-header__title"
             v-for="day in weekdays">
          {{ day }}
        </div>
      </div>
      <div class="days-wrapper">
        <div
          class="day"
          v-for="(day, index) in daysMonth"
          :key="index"
          @click.capture.stop="
          localValue = dayjs(day.date).toISOString();
          $emit('update:modelValue', localValue);
          $emit('input');
         "
        >
          <span
            v-if="day.day"
            class="day-title"
            :class="{'selected': dayjs(day.date).toISOString() === dayjs(localValue).toISOString()}"
          >
            {{ day.day }}
          </span>

        </div>
      </div>
    </div>
    <div class="month-list"></div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');
type Date = {
  day: number | null,
  date: string | null
}
interface Props {
  value?: string;
  modelValue?: string;
}
const props = defineProps<Props>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'input'):void
}>()


const localValue = ref<null | string>(dayjs().toString());
const daysMonth = ref<Date[]>([]);
const year = ref('');
const month = ref('');

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const generateCalendar = (dateToGenerate: string) => {
  const firstDayOfMonth = dayjs(dateToGenerate).startOf('month').day();
  const daysInMonth = dayjs(dateToGenerate).daysInMonth();

  month.value = dayjs(dateToGenerate).format('MMMM');
  year.value = dayjs(dateToGenerate).format('YYYY')

  daysMonth.value = [];
  let day = 1;

  for (let i = 1; i < 43; i++) {
    if (i < firstDayOfMonth || day > daysInMonth) {
      daysMonth.value.push({ day: null, date: null });
    } else {
      daysMonth.value.push({ day, date: dayjs(dateToGenerate).set('date', day).toISOString() });
      day++;
    }
  }
};

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
    if (!dayjs(val).isValid()) return;
    localValue.value = val;
  },
);

watch(
  localValue,
  (val) => {
    if (!val) return;
    if (!dayjs(val).isValid()) return;
    generateCalendar(val);
  },
  { immediate: true, deep: true },
);

</script>

<style lang="sass" scoped>
.calendar 
  height: max-content
  width: max-content
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
    .month-picker
      display: flex
      align-items: center
      justify-content: space-between
      cursor: pointer
      .month-title
        font-size: 18px
        font-weight: 300
        min-width: 84px
        margin-bottom: 4px
        text-align: center
        user-select: none
      .month-change
        width: 35px
        height: 23px
        color: var(--base-text-color)
        cursor: pointer
    .year-picker
      padding: 5px 10px
      border-radius: 10px
      cursor: pointer
  .calendar__body
    padding: 10px
    .weeks-header
      height: 50px
      display: grid
      grid-template-columns: repeat(7, 1fr)
      font-weight: 600
    .weeks-header__title
      display: grid
      place-items: center
      color: var(--secondary-text-color)
      user-select: none
    .days-wrapper
      display: grid
      grid-template-columns: repeat(7, 1fr)
      gap: 2px
      color: var(--base-text-color)
      animation: to-top 0.5s forwards
      .day
        width: 35px
        height: 35px
        position: relative
        cursor: pointer
        .day-title
          display: flex
          align-items: center
          justify-content: center
          padding: 5px
          width: 100%
          height: 100%
          border-radius: var(--border-radius)
          user-select: none
          &.selected
            background-color: var(--primary) !important
          &:hover
            background-color: var(--background)

.month-list 
  position: absolute
  width: 100%
  height: 100%
  top: 0
  left: 0
  background-color: var(--bg-main)
  padding: 20px
  grid-template-columns: repeat(3, auto)
  gap: 5px
  display: grid
  transform: scale(1.5)
  visibility: hidden
  pointer-events: none
.month-list.show 
  transform: scale(1)
  visibility: visible
  pointer-events: visible
  transition: all 0.2s ease-in-out
.month-list > div 
  display: grid
  place-items: center
.month-list > div > div 
  width: 100%
  padding: 5px 20px
  border-radius: 10px
  text-align: center
  cursor: pointer
  color: var(--color-txt)
.month-list > div > div:hover 
  background-color: var(--color-hover)


@keyframes to-top
  0%
    transform: translateY(10%)
    opacity: 0
  100%
    transform: translateY(0)
    opacity: 1
</style>