<template>
  <div
    class="month-list"
    :class="{'visible': show}">
    <div
      v-for="(month, index) in month_names"
      :key="month"
      class="month"
      @click.capture.stop="selectMonth(index)"
      >
        <div
          class="month-title">
          {{ month }}
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
interface Props {
  show: boolean;
  value: string;
}
defineProps<Props>();

const month_names = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

const emit = defineEmits<{
  (e: 'month-selected', value: string):void;
  (e: 'close'): void;
}>()

const selectMonth = (index: number) => {
  const newDate = dayjs().month(index).toISOString()
  emit('month-selected', newDate)
}
</script>

<style lang="sass" scoped>
.month-list
  position: absolute
  width: 345px
  height: 100%
  top: 0
  left: 0
  background-color: var(--main)
  padding: 20px
  grid-template-columns: repeat(3, auto)
  gap: 5px
  display: grid
  transform: scale(1.3)
  visibility: hidden
  pointer-events: none
  &.visible
    transform: scale(1)
    visibility: visible
    pointer-events: visible
    transition: all 0.2s ease-in-out
  .month
    display: grid
    place-items: center
    .month-title
      width: 100%
      padding: 5px
      border-radius: var(--border-radius)
      text-align: center
      cursor: pointer
      color: var(--text)
      &:hover
        background-color: var(--background)
        user-select: none
</style>