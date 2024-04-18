<template>
  <teleport to="#__nuxt" v-if="showModal">
    <div class="overlay" :class="showModal ? 'active' : ''">
      <div
        class="modal"
        :class="showModal ? 'active' : ''"
        @keydown.esc="$emit('close')"
      >
        <TheForm hideBody smallTitleSize>
          <template #title>
            <slot name="content">
              {{ contentText }}
            </slot>
          </template>
          <template #footer>
            <slot name="button">
              <TheButton @click="$emit('confirm')">Подтвердить</TheButton>
              <TheButton @click="$emit('reject')">Отмена</TheButton>
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
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'confirm'): void;
  (e: 'reject'): void;
}>();
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
    background-color: var(--overlay)
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
        border-radius: var(--border-radius)
        background-color: var(--sidebar)
        color: var(--base-text-color)
        transition: all 0.25s
        transform: scale(0.5)
        &.active
            transform: scale(1)
            transition: all 0.25s
            pointer-events: all
</style>
