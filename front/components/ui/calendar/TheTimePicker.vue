<template>
  <div
    class="time-select"
    :class="{'visible': show}">
    <div class="time-wheel">
      <div
        ref="hourWheel"
        class="hour-wheel"
      >
        <div
          v-for="hour in hours"
          :key="hour"
          class="hour-option"
          :class="{ 'selected': hour === localHour }"
          @click.capture.stop="selectHour(hour)"
        >
          {{ hour < 10 ? `0${hour}` : hour }}
        </div>
      </div>
      <div
        ref="minuteWheel"
        class="minute-wheel"
      >
        <div
          v-for="minute in minutes"
          :key="minute"
          class="minute-option"
          :class="{ 'selected': minute === localMinute }"
          @click.capture.stop="selectMinute(minute)"
        >
          {{ minute < 10 ? `0${minute}` : minute }}
        </div>
      </div>
    </div>
    <TheIconButton
      class="time-select__icon-save"
      icon="material-symbols-light:save"
      size="40"
      @click.capture.stop="selectTime"
    />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
interface Props {
  show: boolean;
  value: string;
}
const props = defineProps<Props>();

const localHour = ref<number>(0)
const localMinute = ref<number>(0)
const hourWheel = ref<HTMLElement | null>(null);
const minuteWheel = ref<HTMLElement | null>(null);

const emit = defineEmits<{
  (e: 'time-selected', value: string):void;
  (e: 'close'): void;
}>()

const minutes = computed(() => {
  return Array.from({ length: 60 }, (_, i) => i);
});

const hours = computed(() => {
  return Array.from({ length: 24 }, (_, i) => i);
});

const selectTime = () => {
  const selectedTime = dayjs(props.value).hour(localHour.value).minute(localMinute.value).toISOString();
  emit('time-selected', selectedTime);
}

const selectHour = (hour: number) => {
  localHour.value = hour;
};
const selectMinute = (minute: number) => {
  localMinute.value = minute;
};

const scrollToSelectedHour = async () => {
  if (hourWheel.value) {
    const hourElement = hourWheel.value.querySelector('.hour-option.selected');
    if (hourElement) {
      hourElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }
}
const scrollToSelectedMinute = async () => {
  if (minuteWheel.value) {
    const minuteElement = minuteWheel.value.querySelector('.minute-option.selected');
    if (minuteElement) {
      minuteElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }
};

watch(
  ()=>props.show,
  (val) => {
    if (val) {
      scrollToSelectedHour();
      setTimeout(() => {
        scrollToSelectedMinute();
      }, 800);
    }
  },
);

watch(
  ()=>props.value,
  (val) => {
    if (!dayjs(val).isValid()) return;
    if (!val) return;
    const currentTime = dayjs(props.value);
    localHour.value = currentTime.hour();
    localMinute.value = currentTime.minute();
  },
  { deep: true },
);
</script>

<style lang="sass" scoped>
.time-select
  position: absolute
  width: 345px
  height: 100%
  top: 0
  left: 0
  background-color: var(--main)
  padding: 20px
  gap: 5px
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  transform: scale(1.3)
  visibility: hidden
  pointer-events: none
  &.visible
    transform: scale(1)
    visibility: visible
    pointer-events: visible
    transition: all 0.2s ease-in-out
  .time-wheel
    display: flex
    width: 305px
    justify-content: space-evenly
    align-items: center
    .hour-wheel, .minute-wheel
      width: 70px
      height: calc(var(--base-height) * 3)
      overflow-y: scroll
      scroll-behavior: smooth
      border: 1px solid var(--border-base)
      border-radius: var(--border-radius)
      box-shadow: 0 4px 6px var(--box-shadow)
      padding: 5px
      .hour-option, .minute-option
        padding: 5px
        cursor: pointer
        border-radius: var(--border-radius)
        &:hover
          border: 1px solid var(--background)
          transform: scale(1.05)
        &.selected
          background-color: var(--background)
  .time-select__icon-save
    position: absolute
    bottom: 15px
    right: 15px
</style>