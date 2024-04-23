export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    mounted (el, { value }) {
      el.clickOutside = (event: Event) => {
        if(!(el === event.target || el.contains(event.target))){
          value(event);
        }
      }
      document.addEventListener('click', el.clickOutside);
    },
    unmounted(el) {
      document.removeEventListener('click', el.clickOutside);
    }
  })
})