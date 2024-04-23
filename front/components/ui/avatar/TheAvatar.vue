<template>
  <div class="avatar__container">
    <img v-if=picture :src="picture" class="avatar__img"  alt="user photo"/>
    <div class="avatar__letters">{{ letter }}</div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  picture?: string | undefined;
  name?: string | undefined;
  surname?: string | undefined;
}

const props = defineProps<Props>();

const letter = ref('');

watch(
  () => props.name,
  () => {
    letter.value = getFirstLetters(props.name, props.surname)
  },
);
watch(
  () => props.surname,
  () => {
    letter.value = getFirstLetters(props.name, props.surname)
  },
);
const getFirstLetters = (name: string | undefined, surname: string | undefined): string => {
  if (name && surname) {
    return `${name.charAt(0)} ${surname.charAt(0)}`;
  }
  if (name) {
    return `${name.charAt(0)}`
  }
  if (surname) {
    return `${surname.charAt(0)}`;
  }
  return 'U';
}
</script>

<style lang="sass" scoped>
.avatar__container
  width: 50px
  height: 50px
  pointer-events: none
  display: flex
  justify-content: center
  align-items: center
  border-radius: 50px
  background-color: var(--primary)
  .avatar__letters
     user-select: none
     font-size: 20px
     font-weight: 400
     color: var(--white)
  .avatar__img
    object-fit: cover
    width: 100%
    height: 100%
</style>