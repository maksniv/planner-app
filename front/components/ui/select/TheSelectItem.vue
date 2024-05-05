<template>
    <div
      class="dropdown-menu__item"
      :class="{ 'chosen': chosen, 'selected': selected }"
      @click.capture.stop="selectItem"
    >
      <div
        v-html="nameText"
        class="dropdown-menu__item-name"
      />
    </div>
</template>

<script setup lang="ts">
import { getType } from '~/utils/getType';
import { getObjectField } from '~/utils/getObjectField';

interface Props {
  item: object;
  itemText?: 'name' | string;
  chosen: boolean;
  selected: boolean;
  searchValue?: string;
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
      let resultInsert = match
        .split('')
        .reduce((acc, letter, index) => acc + name[offset + index], '');
      return `<span class="highlight">${resultInsert}</span>`;
    }
  );
});

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
  color: var(--base-text-color)
  &.selected
    color: var(--disabled-text-color)
    border-radius: var(--border-radius)
    //border: 1px solid var(--primary)
  &.chosen
    background-color: var(--background)
    border-radius: var(--border-radius)
    border: 1px solid var(--border-base)
</style>

<style lang="sass">
  .highlight
    color: var(--primary)
</style>
