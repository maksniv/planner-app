<template>
  <teleport to="#__nuxt" v-if="showModal">
    <div class="overlay" :class="showModal ? 'active' : ''" @click="$emit('close')">
      <div
        class="modal"
        :class="showModal ? 'active' : ''"
        @keydown.esc="$emit('close')"
      >
        <TheIconButton
          icon="gg:close"
          class="modal__icon"
          size="30"/>
        <h1 class="modal__title">
          <slot name="title">
          </slot>
        </h1>
        <div class="modal__content">
          <slot name="body">
          </slot>
        </div>
        <div class="modal__line"/>
        <div class="modal__button-wrapper">
          <slot name="button">
            <TheButton @click="$emit('confirm')">Подтвердить</TheButton>
            <TheButton @click="$emit('reject')" outlined>Отмена</TheButton>
          </slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
interface Props {
  showModal: boolean | false;
  contentText?: string | '';
}

defineProps<Props>();

defineEmits<{
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
        position: relative
        width: 40vw
        max-width: 600px
        min-height: 200px
        padding: 24px 32px 20px 32px
        height: auto
        border-radius: var(--border-radius)
        background-color: var(--sidebar)
        color: var(--base-text-color)
        transition: all 0.25s
        transform: scale(0.5)
        display: flex
        flex-direction: column
        border: 1px solid var(--border-base)
        &.active
            transform: scale(1)
            transition: all 0.25s
            pointer-events: all
        .modal__icon
          position: absolute
          right: 8px
          top: 8px
        .modal__title
          padding: 0 0 24px 0
          font-size: 36px
        .modal__content
          flex: 1
          width: 100%
          display: flex
          flex-direction: column
          padding: 0 0 30px 0
          gap: 10px
        .modal__line
          width: 100%
          border: 1px solid var(--border-base)
        .modal__button-wrapper
          align-self: flex-end
          display: flex
          gap: 24px
          padding: 24px 0 0 0
</style>
