<template>
  <div
    class="dropdown-menu"
    :class="{ 'is-visible': isOpen,  'with-label': withLabel }"
    @keydown.down="buttonDown"
    @keydown.up="buttonUp"
    @keydown.enter="buttonEnter"
    >
      <div
        class="dropdown-menu__items-list"
      >
        <div
          v-if="searchInDropdown"
          class="dropdown-menu__filter-wrapper"
        >
          <input
            class="dropdown-menu__filter"
            v-model="stringFilter"
            ref="inputRef"
            placeholder="Поиск"
            type="text"
            @click.capture.stop="focusOnAutocomplete"
          >
          <TheIconButton
            class="dropdown-menu__clear-filter"
            @click="stringFilter = ''"
            icon="mdi:clear-bold"
            size="18"
          />
        </div>
        <TheSelectItem
          v-for="(item, index) in list"
          :key="getItemKey(item, index)"
          :chosen="chosenItem(index)"
          :selected="selectedItem(item.id)"
          :item="item"
          :item-text="itemText"
          :search-value="stringFilter"
          :colorize="colorize"
          @select-item="selectItem($event)"
          @mouseenter.native="chosenElement = index"
        />
        <div
          v-if="!list || list.length === 0"
          class="dropdown-menu__no-items"
        >
          <Icon name="material-symbols:error-outline" size="30"/>
          {{ emptyTextDefault }}
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { getType } from '~/utils/getType';
import { getObjectField } from '~/utils/getObjectField';
import { onMounted } from 'vue';

type SelectItem = {
  id: string,
  name: string,
  color?: string,
}
interface Props {
  value?: null | SelectItem;
  isOpen?: boolean
  items?: Array<SelectItem>;
  emptyText?: string;
  withLabel?: boolean;
  itemText?: 'name' | string;
  localValue: null | SelectItem;
  searchInDropdown?: boolean | false;
  colorize?: boolean | false;
  readonly?: boolean | false;
}
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'select', item: null | SelectItem ): void;
  (e: 'close'): void;
}>();

const chosenElement = ref(0);
const stringFilter = ref('')
const inputRef = ref<HTMLElement | null>(null);

const emptyTextDefault = computed(() => {
  return props.emptyText || 'Совпадений не найдено';
})

onMounted(() => {
  if (props.value) setItemToInput()
});

const list = computed(() => {
  return getList(props.items || [], true)
});
const chosenItem = (index: number) => {
  return index === chosenElement.value;
}

const selectedItem = (id: string) => {
  if (props.localValue && props.localValue.id) {
    const valueId = props.localValue.id;
    return id === valueId;
  }
  return false;
}
const getName = (value: any) => {
  const type = getType(value);
  if (type === 'String' || type === 'Number') return value;
  return type === 'Object' ? getObjectField(value, props.itemText || 'name') : '';
}
const getList = (list: Array<any>, useStringFilter: boolean = false): Array<any> => {
  return useStringFilter
    ? list.filter(item => {
      const value = getName(item).toString().toLowerCase();
      const regExp = stringFilter.value.toLowerCase();
      return value.match(regExp) !== null;
    })
    : list;
}
const setItemToInput = () => {
  if (list.value.length && props.value)  {
    let currItemIndex = list.value.findIndex(el => (el as any).id === (props.value as any)?.id)
    if(currItemIndex >= 0) selectItem(list.value[currItemIndex])
    else selectItem(props.value);
  }
}
const selectItem = (item: SelectItem) => {
  if(!list || list.value.length === 0) return;
  emit('select', item);
  if (item) {
    stringFilter.value = '';
  }
  emit('close');
}
const focusOnAutocomplete = () => {
  if (process.server) return
  if (inputRef.value) {
    inputRef.value.focus();
  }
}
const buttonUp = () => {
  let result = chosenElement.value - 1;
  if (result < 0) result = 0;
  chosenElement.value = result;
}
const buttonDown = () => {
  let result = chosenElement.value + 1;
  if (result >= list.value.length) result = list.value.length - 1;
  chosenElement.value = result;
}
const buttonEnter = async() => {
  selectItem(list.value[chosenElement.value]);
  stringFilter.value = '';
  if (chosenElement.value === list.value.length) {
    chosenElement.value -= 1;
  }
}
const getItemKey = (item: SelectItem, index: number) => {
  if (!item) return `no-item-${index}`
  return `selectable- ${(item.id || getName(item))}`;
}
</script>

<style scoped lang="sass">
.dropdown-menu
  position: absolute
  z-index: var(--z-dropdown)
  display: flex
  max-width: var(--max-width-field)
  width: 100%
  flex-flow: column nowrap
  max-height: 460px
  height: 0
  padding: 0
  background-color: var(--sidebar)
  border-radius: var(--border-radius)
  overflow:  hidden auto
  &.with-label
    top: 80px !important
  &.is-visible
    top: 50px
    border: 1px solid var(--border-base)
    height: auto !important
    box-shadow: 0 4px 6px var(--box-shadow)
    &::-webkit-scrollbar
      display: none
  .dropdown-menu__items-list
    padding: 4px 0
    overflow: hidden auto
    .dropdown-menu__no-items
      padding: 7px 17px
      height: var(--base-height)
      display: flex
      align-items: center
      gap: 10px
      color: var(--danger)
    .dropdown-menu__filter-wrapper
      position: relative
      border-bottom: 1px solid var(--border-base)
      .dropdown-menu__filter
        width: 100%
        height: var(--base-height)
        padding: 10px 45px 10px 12px
        &::placeholder
          color: var(--secondary-text-color)
      .dropdown-menu__clear-filter
        position: absolute
        right: 15px
        color: var(--base-text-color)
        bottom: calc(var(--base-height)/2 - 10px)
        z-index: 1
</style>