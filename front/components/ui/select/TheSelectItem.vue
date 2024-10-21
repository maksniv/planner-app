<template>
  <div
    class="dropdown-menu__item"
    :class="{ 'chosen': chosen, 'selected': selected }"
    @click.capture.stop="selectItem"
    >
      <div
        class="dropdown-menu__item-name"
        :class="{'colorize': colorize}"
        :style="{
          'background-color': itemColor,
          color: textColor,
        }"
        v-html="nameText"
      />
    </div>
</template>

<script setup lang="ts">
import { getType } from '~/utils/getType';
import { getObjectField } from '~/utils/getObjectField';
import { contrastTextColor } from '~/utils/contrastTextColor';

type SelectItem = {
  id: string,
  name: string,
  color?: string,
}

interface Props {
  item: SelectItem;
  itemText?: 'name' | string;
  chosen: boolean;
  selected: boolean;
  searchValue?: string;
  colorize?: boolean | false;
}
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'select-item', value: object): void;
}>();

const nameText = computed(() => {
  const name = props.item ? String(getName(props.item)) : '';
  if (!props.searchValue) return name;
  return name.replace(
    new RegExp(props.searchValue, 'gi'),
    (match, offset) => {
      const resultInsert = match
        .split('')
        .reduce((acc, letter, index) => acc + name[offset + index], '');
      return `<span class="highlight-text">${resultInsert}</span>`;
    }
  );
});

const itemColor = computed(() => {
  if(!props.colorize) return
  return props.item && props.item.color? props.item.color : '';
})

const textColor = computed(() => {
  if(!props.colorize) return
  return props.item && props.item.color? contrastTextColor(props.item.color) : '';
})

const getName = (value: any) => {
  const type = getType(value);
  if (type === 'String' || type === 'Number') return value;
  return type === 'Object' ? getObjectField(value, props.itemText || 'name') : '';
}

const selectItem = () => {
  emit('select-item', props.item);
}
</script>

<style lang="sass" scoped>
.dropdown-menu__item
  padding: 7px 17px
  min-height: var(--base-height)
  height: fit-content
  display: flex
  align-items: center
  color: var(--text)
  &.selected
    color: var(--disabled-text-color)
    min-height: var(--base-height)
    border-radius: var(--border-radius)
  &.chosen
    background-color: var(--background)
    border-radius: var(--border-radius)
    min-height: var(--base-height)
    border: 1px solid var(--border-base)
  .dropdown-menu__item-name.colorize
    padding: 3px 5px
    border-radius: var(--border-radius)

</style>
