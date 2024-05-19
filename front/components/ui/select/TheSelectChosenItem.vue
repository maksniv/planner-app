<template>
  <span
    v-if="!localValue"
    class="select-field__placeholder">
      {{ placeholderTextDefault }}
  </span>
  <span
    v-if="localValue"
    class="select-field__selected"
    :class="{'colorize': colorize}"
    :style="{
      'background-color': itemColor,
       color: textColor,
    }"
  >
      {{ getName(localValue) }}
  </span>
</template>

<script setup lang="ts">
import { getType } from '@/utils/getType';
import { getObjectField } from '@/utils/getObjectField';
import { contrastTextColor } from '~/utils/contrastTextColor';

type SelectItem = {
  id: string,
  name: string,
  color?: string,
}
interface Props {
  localValue?: null | SelectItem;
  placeholderText?: string;
  itemText?: 'name' | string;
  colorize?: boolean | false;
}
const props = defineProps<Props>();

const placeholderTextDefault = computed(() => {
  return props.placeholderText || 'Выберете значение';
})

const itemColor = computed(() => {
  if(!props.colorize) return
  return props.localValue && props.localValue.color? props.localValue.color : '';
})

const textColor = computed(() => {
  if(!props.colorize) return
  return props.localValue && props.localValue.color? contrastTextColor(props.localValue.color) : '';
})
const getName = (value: any) => {
  const type = getType(value);
  if (type === 'String' || type === 'Number') return value;
  return type === 'Object' ? getObjectField(value, props.itemText || 'name') : '';
}
</script>

<style lang="sass" scoped>
.select-field__placeholder
  color: var(--secondary-text-color)
  display: inline-block
.select-field__selected
  color: var(--base-text-color)
  display: inline-block
  &.colorize
    padding: 3px 5px
    border-radius: var(--border-radius)
</style>