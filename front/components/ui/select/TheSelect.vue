<template>
  <div
    class="select"
    ref="elementRef"
    :class="{'readonly': readonly }"
    @keyup.tab="focusOnAutocomplete"
    @keydown.down="buttonDown"
    @keydown.up="buttonUp"
    @keydown.enter="buttonEnter"
  >
    <label
        v-if="labelText"
        class="select-label"
        :class="{'readonly': readonly}"
      >
        {{ labelText }}
      </label>
      <div
        class="select-field"
        :class="{
          'is-active': showList,
         }"
        @click="openList"
        v-click-outside="closeList"
        >
        <span
          v-if="!localValue"
          class="select-field__placeholder">
          {{ placeholderTextDefault }}
        </span>
        <span
          v-if="localValue"
          class="select-field__selected">
          {{ getName(localValue) }}
        </span>
        <TheIconButton
          v-if="localValue"
          class="select-field__clear-value"
          @click.capture.stop="clearValue"
          icon="mdi:clear-bold"
          size="20"
        />
        <TheIconButton
          v-if="canBeOpened"
          @click.capture.stop="toggleList"
          class="select-field__triangle"
          icon="bxs:down-arrow"
          size="20"
        />
        <div
          :class="{ 'readonly': readonly }"
          class="select-field__values"
        >
          <div
            class="select-field__dropdown-menu"
            :class="{ 'is-visible': showList }"
            :style="{
              top: listCord.top ? listCord.top + 'px' : 'auto',
              bottom: listCord.bottom ? listCord.bottom + 'px' : 'auto',
              right: listCord.right + 'px',
              left: listCord.left + 'px'
            }"
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
                >
                <TheIconButton
                  class="dropdown-menu__clear-filter"
                  @click="stringFilter = ''"
                  icon="material-symbols:close"
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getType } from '@/utils/getType';
import { getObjectField } from '@/utils/getObjectField';
import { onMounted } from 'vue';

interface Props {
  modelValue?: null | object | string;
  value?: null | object;
  items?: Array<any>;
  placeholderText?: string;
  labelText?: string;
  emptyText?: string;
  itemText?: 'name' | string;
  searchInDropdown?: boolean | false;
  readonly?: boolean | false
}
const props = defineProps<Props>();
// data
const localValue = ref<null | object>(null);
const showList = ref(false);
const chosenElement = ref(0);
const listCord = ref({top: 0, bottom: 0, left: 0, right: 0})
const stringFilter = ref('')
const inputRef = ref<HTMLElement | null>(null);
const elementRef = ref<HTMLElement | null>(null);

// emit
const emit = defineEmits<{
  (e: 'update:modelValue', value: null | object | string): void;
  (e: 'input'): void;
  (e: 'blur'): void;
  (e: 'focus'): void;
}>();

// mounted
onMounted(() => {
  if (props.value) setItemToInput()
});
// watch
watch(
  () => props.value,
  (val) => {
    if (!val) return;
    if (!localValue.value && val) {
      localValue.value = { ...val }
    }
  },
  { immediate: true },
);

watch(
  () => localValue,
  (val) => {
    if (!val) return;
    if (JSON.stringify(val) !== JSON.stringify(props.value)) {
      if (props.value) {
        if (val.id !== props.value?.id) {
          emit('update:modelValue', localValue.value);
          emit('input');
        }
      } else {
        emit('update:modelValue', localValue.value);
        emit('input');
      }
    }
  },
  { deep: true },
);

// computed
const list = computed(() => {
    return getList(props.items || [], true)
});
const canBeOpened = computed(() => {
  return !props.readonly && list.value.length;
});
const placeholderTextDefault = computed(() => {
  return props.placeholderText || 'Выберете значение';
})
const emptyTextDefault = computed(() => {
  return props.emptyText || 'Совпадений не найдено';
})

// methods
const getList = (list: Array<any>, useStringFilter: boolean = false): Array<any> => {
  return useStringFilter
    ? list.filter(item => {
      const value = getName(item).toString().toLowerCase();
      const regExp = stringFilter.value.toLowerCase();
      return value.match(regExp) !== null;
    })
    : list;
}
const getName = (value: any) => {
  const type = getType(value);
  if (type === 'String' || type === 'Number') return value;
  return type === 'Object' ? getObjectField(value, props.itemText || 'name') : '';
}

const focusOnAutocomplete = () => {
  if (process.server) return
  if (inputRef.value) {
    inputRef.value.focus();
  }
}
const blurAutocomplete = () => {
  if (process.server) return
  if (inputRef.value) {
    inputRef.value.blur();
  }
}
const selectItem = (item: object) => {
  if(!list || list.value.length === 0) return;
  localValue.value = item;
  if (item) {
    blurAutocomplete();
    stringFilter.value = '';
  }
  closeList();
}
const clearValue = () => {
  localValue.value = null;
  emit('update:modelValue', localValue.value);
  emit('input');
}
const setItemToInput = () => {
    if (list.value.length && props.value)  {
      let currItemIndex = list.value.findIndex(el => (el as any).id === (props.value as any)?.id)
      if(currItemIndex >= 0) selectItem(list.value[currItemIndex])
      else selectItem(props.value);
  }
}

// list controls
const toggleList = () => {
  if(showList.value){
    closeList()
  } else {
    openList()
  }
}
const openList = () => {
  if (props.readonly) return;
  showList.value = true;
  focusOnAutocomplete();
  listCordController();
  document.addEventListener('scroll', listCordController, true);
  window.addEventListener('resize', listCordController, false);
}
const closeList = () => {
  showList.value = false;
  document.removeEventListener('scroll', listCordController, true);
  window.removeEventListener('resize', listCordController, false);
}
const listCordController = () => {
  if (!elementRef.value) return;
  const element = elementRef.value as HTMLElement;
  const documentHeight = document.documentElement.clientHeight;
  const documentWidth = document.documentElement.clientWidth;
  const selectToBottomDocument = documentHeight - element.getBoundingClientRect().bottom;
  const selectToTopDocument = element.getBoundingClientRect().top;
  let listHeight = 50;
  if (list.value && list.value.length !== 0) {
    listHeight = list.value.length * 34 + 8;
  }
  if(props.searchInDropdown) {
    listHeight = listHeight + 36;
  }
  if (listHeight > 460) listHeight = 460;

  let right = documentWidth - element.getBoundingClientRect().right;
  const left = element.getBoundingClientRect().left + 8;

  const [main, other] = selectToBottomDocument < selectToTopDocument ? ['bottom', 'top'] : ['top', 'bottom'];
  listCord.value = {
    left,
    right: right + 8,
    top: main === 'top'
      ? Math.max(element.getBoundingClientRect().bottom -  2, 0)
      : 20,
    bottom: main === 'bottom'
      ? Math.max(documentHeight - element.getBoundingClientRect().bottom + 62, 0)
      : 20,
  };
  const mainKey = main as keyof typeof listCord.value;
  const otherKey = other as keyof typeof listCord.value;

  const otherCord = documentHeight - listCord.value[mainKey] - listHeight;
  listCord.value[otherKey] = otherCord > 0 ? otherCord : 20;
}
// navigation
const chosenItem = (index: number) => {
  return index === chosenElement.value;
}
const selectedItem = (id: string) => {
  if (localValue.value && 'id' in localValue.value) {
    const value = localValue.value as { id: string };
    return id === value.id;
  }
  return false;
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
const getItemKey = (item: object, index: number) => {
  if (!item) return `no-item-${index}`
  return `selectable- ${(item.id || getName(item))}`;
}
</script>

<style lang="sass" scoped>
.select
  position: relative
  display: flex
  flex-flow: column nowrap
  justify-content: flex-end
  width: 100%
  margin-bottom: 0
  gap: 10px
  &.readonly
    pointer-events: none
    user-select: none
  .select-label
    color: var(--base-text-color)
    display: inline-block
  .select-field
    cursor: pointer
    height: var(--base-height)
    border-radius: var(--border-radius)
    border: 1px solid var(--border-base)
    color: var(--base-text-color)
    background-color: var(--background)
    padding: 10px 45px 10px 12px
    transition: color .15s, border .15s ease-out
    &::placeholder
      color: var(--secondary-text-color)
    &:hover
      border: 1px solid var(--primary-hover)
    &:active
      border: 1px solid var(--primary)
    &:focus
      box-shadow: 0 0 0 2px var(--primary-focus)
    .select-field__placeholder
      color: var(--secondary-text-color)
      display: inline-block
    .select-field__selected
      color: var(--base-text-color)
      display: inline-block
    .select-field__clear-value
      z-index: 10
      position: absolute
      right: 45px
      bottom: calc(var(--base-height)/2 - 10px)
    .select-field__triangle
      z-index: 10
      position: absolute
      right: 20px
      bottom: calc(var(--base-height)/2 - 10px)
    .select-field__values
      position: relative
      flex-grow: 2
      display: flex
      flex-flow: row nowrap
      align-items: center
      justify-content: flex-start
      width: 100%
      padding: 15px 0
      overflow: hidden
      .select-field__dropdown-menu
        z-index: 102
        display: flex
        width: 100%
        flex-flow: column nowrap
        height: 0
        max-height: 460px
        padding: 0
        background-color: var(--sidebar)
        border-radius: var(--border-radius)
        overflow: hidden auto
        &.is-visible
          border: 1px solid var(--border-base)
          height: auto
          box-shadow: 0 4px 6px var(--box-shadow)
        &::-webkit-scrollbar
          display: none
        .dropdown-menu__items-list
          z-index: 102
          height: 100%
          padding: 4px 0
          overflow: auto
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
            bottom: calc(var(--base-height)/2 - 10px)
            z-index: 1
</style>