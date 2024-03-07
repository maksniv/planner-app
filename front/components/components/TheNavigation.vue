<template>
  <div class="navigation">
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
</template>

<style lang="sass" scoped>
.navigation
  width: 100%
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  justify-content: flex-start
  align-items: flex-start
</style>
