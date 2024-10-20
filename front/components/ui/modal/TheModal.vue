<template>
  <ClientOnly>
    <teleport
      v-if="showModal"
      to="#__nuxt"
      >
      <div
        class="overlay" :class="showModal ? 'active' : ''"
        @click.self="$emit('close')"
        >
        <div
          class="modal"
          :class="showModal ? 'active' : ''"
        >
          <TheIconButton
            icon="gg:close"
            class="modal__icon"
            size="28"
            @click.capture.stop="$emit('close')"
          />
          <h1 class="modal__title">
            <slot name="title">
              {{ titleText }}
            </slot>
          </h1>
          <div class="modal__content">
            <slot name="body">
              {{ contentText }}
            </slot>
          </div>
          <div class="modal__line"/>
          <div class="modal__button-wrapper">
            <slot name="button">
              <UIButton @click="$emit('confirm')">Подтвердить</UIButton>
              <UIButton outlined @click="$emit('reject')">Отмена</UIButton>
            </slot>
          </div>
        </div>
      </div>
    </teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
interface Props {
  showModal: boolean | false;
  contentText?: string | '';
  titleText?: string | '';
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
    z-index: var(--z-modal)
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
          right: 5px
          top: 5px
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
