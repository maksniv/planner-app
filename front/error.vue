<template>
  <div class="error-page">
    <div class="error__container">
      <div class="error__text-block">
        <div class="text-block__title">Страница не найдена</div>
        <div class="text-block__text">
          Кажется, что страница, которую вы ищете, где-то потерялась, но не
          беспокойтесь, мы вас вернем.
        </div>
        <UIButton>
          <NuxtLink to="/tasks" class="text-block__link">Вернуться</NuxtLink>
        </UIButton>
      </div>
      <img
        class="error__img"
        src="@/assets/img/404.svg"
        alt="Страница не найдена"
      >
    </div>
  </div>
</template>

<style scoped lang="sass">
.error-page
  width: 100%
  height: 100vh
  display: flex
  background-color: var(--background)
  position: relative
  .error__container
    margin: auto
    display: flex
    flex-direction: row
    justify-content: space-between
    gap: 5px
    padding: 10px 30px
    border: 1px solid var(--border-base)
    border-radius: var(--border-radius)
    background-color: var(--sidebar)
    color: var(--base-text-color)
    height: 450px
    max-width: 900px
    width: 100%
    .error__text-block
      display: flex
      flex-direction: column
      justify-content: space-evenly
      align-items: center
      text-align: center
      width: 50%
      .text-block__title
        font-weight: 700
        font-size: 45px
      .text-block__text
        font-weight: 300
        font-size: 20px
      .text-block__text
        font-weight: 300
        font-size: 20px
    .error__img
      width: 50%
      height: 100%
      object-fit: contain
</style>
