<template>
  <div
    class="select"
    :class="{'readonly': readonly }"
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
        v-if="localValue && clearable"
        class="select-field__clear-value"
        @click.capture.stop="clearValue"
        icon="mdi:clear-bold"
        size="20"
      />
      <TheIconButton
        @click.capture.stop="toggleList"
        class="select-field__triangle"
        icon="bxs:down-arrow"
        size="20"
      />
    </div>
    <TheSelectMenu
      :empty-text="emptyText"
      :isOpen="showList"
      :searchInDropdown="searchInDropdown"
      :value="value"
      :localValue="localValue"
      :items="items"
      :with-label="labelText !== undefined"
      :itemText="itemText"
      :colorize="colorize"
      @select="localValue = $event"
      @close="closeList"
    />
  </div>
</template>

<script setup lang="ts">
import { getType } from '@/utils/getType';
import { getObjectField } from '@/utils/getObjectField';

type SelectItem = {
  id: string,
  name: string,
  color?: string,
}
interface Props {
  modelValue?: null | SelectItem;
  value?: null | SelectItem;
  items?: Array<SelectItem>;
  placeholderText?: string;
  labelText?: string;
  emptyText?: string;
  itemText?: 'name' | string;
  searchInDropdown?: boolean | false;
  readonly?: boolean | false
  clearable?: boolean | false;
  colorize?: boolean | false;
}
const props = defineProps<Props>();
// data
const localValue = ref<null | SelectItem>(null);
const showList = ref(false);

// emit
const emit = defineEmits<{
  (e: 'update:modelValue', value: null | object | string): void;
  (e: 'input'): void;
  (e: 'blur'): void;
  (e: 'focus'): void;
}>();

// watch
watch(
  () => props.value,
  (val) => {
    if (!val) return;
    if (JSON.stringify(val) !== JSON.stringify(localValue.value)) {
      localValue.value = {...val };
    }
  },
  { immediate: true, deep: true },
);

watch(
  () => props.modelValue,
  (val) => {
    if (!val) return;
    if (JSON.stringify(val)!== JSON.stringify(localValue.value)) {
      localValue.value = {...val };
    }
  },
  { deep: true },
);

watch(
  () => localValue,
  () => {
    if(props.value && localValue.value){
      if (toRaw(props.value.id) === toRaw(localValue.value.id)) return;
    }
      emit('update:modelValue', localValue.value);
      emit('input');
    },
  { deep: true },
);
const placeholderTextDefault = computed(() => {
  return props.placeholderText || 'Выберете значение';
})
// methods
const getName = (value: any) => {
  const type = getType(value);
  if (type === 'String' || type === 'Number') return value;
  return type === 'Object' ? getObjectField(value, props.itemText || 'name') : '';
}
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
}
const closeList = () => {
  showList.value = false;
}
const clearValue = () => {
  localValue.value = null;
}
</script>

<style lang="sass" scoped>
.select
  position: relative
  display: flex
  flex-flow: column nowrap
  width: 100%
  max-width: var(--max-width-field)
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
      color: var(--base-text-color)
      bottom: calc(var(--base-height)/2 - 10px)
    .select-field__triangle
      z-index: 10
      position: absolute
      right: 20px
      bottom: calc(var(--base-height)/2 - 10px)
      color: var(--base-text-color)
</style>