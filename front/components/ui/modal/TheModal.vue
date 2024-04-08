<template>
  <teleport to="#__nuxt" v-if="showModal">
    <div class="overlay" :class="showModal ? 'active' : ''">
      <div
        class="modal"
        :class="showModal ? 'active' : ''"
        @keydown.esc="close()"
      >
        <TheForm hideBody smallTitleSize>
          <template #title>
            <slot name="content">
              {{ contentText }}
            </slot>
          </template>
          <template #footer>
            <slot name="button">
              <TheButton @click="props.confirmFunction?.()">Подтвердить</TheButton>
              <TheButton @click="props.rejectFunction?.()">Отмена</TheButton>
            </slot>
          </template>
        </TheForm>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
interface Props {
  showModal: boolean | false;
  contentText?: string | '';
  confirmFunction?: Function;
  rejectFunction?: Function;
  close: Function;
}

const props = defineProps<Props>();
</script>

<style scoped lang="sass">
.overlay
    min-height: 100vh
    min-width: 100vw
    position: fixed
    top: 0
    left: 0
    display: flex
    align-items: center
    justify-content: center
    background-color: $border
    opacity: 0
    pointer-events: none
    z-index: 100
    transition: all 0.25s
    &.active
        opacity: 1
        transition: all 0.25s
        pointer-events: all
    .modal
        width: auto
        height: auto
        border-radius: $borderRadius
        background-color: $sidebar
        color: $textColor
        transition: all 0.25s
        transform: scale(0.5)
        &.active
            transform: scale(1)
            transition: all 0.25s
            pointer-events: all
</style>
