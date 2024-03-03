<template>
  <aside class="aside__wrapper">
    <img src="/logo.png" class="aside__logo" />
    <div class="aside__navigation">
      <TheNavLink
        title="Задачи"
        link="/"
        icon="radix-icons:dashboard"
      ></TheNavLink>
      <TheNavLink
        title="Пользователь"
        link="/user"
        icon="mingcute:group-line"
      ></TheNavLink>
      <TheNavLink
        title="Статистика"
        link="/statistics"
        icon="ic:sharp-stacked-line-chart"
      ></TheNavLink>
      <TheNavLink
        title="Настройки"
        link="/setting"
        icon="radix-icons:gear"
      ></TheNavLink>
    </div>
  </aside>
</template>

<style lang="sass" scoped>
.aside__wrapper
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  justify-content: flex-start
  align-items: center
  gap: 30px
  height: 100vh
  background-color: $sidebar
  .aside__logo
    margin: 20px 10px
    height: 80px
  .aside__navigation
    display: flex
    flex-direction: column
    flex-wrap: nowrap
    justify-content: flex-start
    align-items: flex-start
    gap: 10px
</style>
