<template>
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
        @click.capture.stop="$emit('day-selected', dayjs(day.date).toISOString())"
      >
          <span
            v-if="day.day"
            class="day-title"
            :class="{
              'selected': value ? dayjs(day.date).format('DD.MM.YYYY') === dayjs(value).format('DD.MM.YYYY') : false,
              'today': dayjs(day.date).format('DD.MM.YYYY') === todayValue,
            }"
          >
            {{ day.day }}
          </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';

interface Props {
  value: string | null;
}
const props = defineProps<Props>();

defineEmits<{
  (e: 'day-selected', value: string):void
}>()

type Date = {
  day: number | null,
  date: string | null
}

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const todayValue = ref(dayjs().format('DD.MM.YYYY'));
const daysMonth = ref<Date[]>([]);

const generateCalendar = (dateToGenerate: string) => {

  const firstDayOfMonth = dayjs(dateToGenerate).startOf('month').day();
  const daysInMonth = dayjs(dateToGenerate).daysInMonth();

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

watch(
  ()=>props.value,
  (val) => {
    if (!dayjs(val).isValid()) return;
    if (!val) {
      generateCalendar(todayValue.value.toString());
      return;
    }
    generateCalendar(val);
  },
  { immediate: true, deep: true },
);
</script>

<style lang="sass">
.calendar__body
  padding: 10px 0
  .weeks-header
    height: 30px
    display: grid
    margin-bottom: 15px
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
        &.today
          border: 1px solid var(--primary)
        &.selected
          background-color: var(--primary) !important
          color: var(--white)
        &:hover
          background-color: var(--background)

@keyframes to-top
  0%
    transform: translateY(10%)
    opacity: 0
  100%
    transform: translateY(0)
    opacity: 1
</style>